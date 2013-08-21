<?php

namespace App\Lib;

use App\AppTrait;
use Webiny\StdLib\SingletonTrait;
use Webiny\StdLib\StdLibTrait;
use Webiny\StdLib\StdObject\StringObject\StringObject;

/**
 * Database class
 *
 */
class Database
{
	use AppTrait, StdLibTrait, SingletonTrait;

	/**
	 * @var \PDO
	 */
	private static $_connection;

	/**
	 * @var \PDOStatement
	 */
	private $_stm;

	/**
	 * @var \PDO
	 */
	private $_result;

	/**
	 * @var Int
	 */
	private $_resultPointer = 0;

	/** Query * */
	private $_query;

	/** Charset */
	public $charset = 'utf8';

	/** Number of affected rows in the last query */
	public $affected_rows;

	/** Number of rows returned by SELECT query     */
	public $num_rows;

	protected $tables = array(
		'w_user',
		'w_weby',
        'w_stat',
        'w_stat_period'
	);

	/** Users table */
	public $w_user;

	/** Webies table */
	public $w_weby;

    /** Stats table */
    public $w_stat;

    /** Stats periods table */
    public $w_stat_period;

	// ** Result Set types - used by fetchAll method **//
	const RT_ARRAY = 'array';
	const RT_OBJECT = 'object';

	/**
	 *
	 * @param String $query
	 */
	public function prepareStatement($query) {
		$this->_stm = $this->_getConnection()->prepare($query);
	}

	/**
	 * Executes current statement
	 *
	 * @param String  $query Query string
	 * @param Array   $bind  Array of values to bind
	 * @param Boolean $stmt  Use previously prepared statement or not
	 *
	 * @return \App\Lib\DatabaseResult
	 */
	public function execute($query, $bind = null, $stmt = false) {
		$this->_query = $query instanceof StringObject ? $query : $this->str($query);

		$this->_flush();

		if(!$stmt) {
			try {
				$this->_stm = $this->_getConnection()->prepare($query);
			} catch (\PDOException $e) {
				die($e);
			}
		}

		if(!$this->_stm instanceof \PDOStatement) {
			die('Database query - you have to prepare statement before you can execute it.');
		}

		try {
			$this->_stm->execute($bind);
		} catch (\PDOException $e) {
			die($e);
		}

		if($this->_query->contains('SELECT') || $this->_query->contains('RETURNING')) {
			$this->_result = $this->_stm->fetchAll(\PDO::FETCH_OBJ);
			$this->num_rows = count($this->_result);
			return new DatabaseResult($this->_result);
		} else {
			$this->affected_rows = $this->_stm->rowCount();
			return $this;
		}
	}

	/**
	 * Executes a MySQL query and returns the result set
	 *
	 * @param      $query - query to be executed
	 * @param bool $timer
	 *
	 * @return DatabaseResult
	 */
	public function query($query, $timer = false) {
		$con = $this->_getConnection();
		$this->_flush();

		$this->_query = $query instanceof StringObject ? $query : $this->str($query);

		try {
			if($this->_query->contains('SELECT') || $this->_query->contains('RETURNING')) {
				foreach ($con->query($query)->fetchAll(\PDO::FETCH_OBJ) as $row) {
					$this->_result[] = $row;
				}
				$this->num_rows = count($this->_result);
				$this->_resultPointer = 0;
			} else {
				$this->affected_rows = $con->exec($query);
				$this->last_inserted_id = $con->lastInsertId();
			}
		} catch (\PDOException $e) {
			die($e);
		}

		return new DatabaseResult($this->_result);
	}

	/**
	 * Joins query with bind params and returns that string
	 *
	 * @param String $query
	 * @param array  $bind
	 *
	 * @return String
	 */
	public function interpolateQuery($query, $bind) {
		$keys = array();

		# build a regular expression for each parameter
		foreach ($bind as $key => &$value) {
			if(is_string($key)) {
				if(!is_numeric($value)) {
					$value = "'" . $value . "'";
				}
				$keys[] = '/:' . $key . '/';
			} else {
				if(!is_numeric($value)) {
					$value = "'" . $value . "'";
				}
				$keys[] = '/[?]/';
			}
		}

		$query = preg_replace($keys, $bind, $query, 1, $count);

		return $query;
	}

	/**
	 * Counts how many entries are there in an array and returns a string containing '?' for each entry
	 *
	 * @param Array|String $params - string must be divided by coma
	 *
	 * @return String
	 */
	public function joinParams(&$params) {
		if(is_array($params)) {
			$pCount = count($params);
			if(end($params) == '') {
				$pCount--;
			}
		} else {
			$parts = explode(',', $params);
			$pCount = count($parts);
			if(end($parts) == '') {
				$pCount--;
			}
		}

		$binds = array();

		for ($i = 1; $i <= $pCount; $i++) {
			$binds[] = '?';
		}

		return implode(',', $binds);
	}

    /**
     * Returns last inserted sequence number for selected table
     * @param $tableName        Table for which we need a sequence number
     * @param string $column    Sequence column name
     * @return Int¸¸            Sequence
     */
    public function lastInsertedId($tableName, $column = 'id') {
        $sequence = $tableName . '_' . $column . '_seq';
        return $this->_getConnection()->lastInsertId($sequence);
    }
	/**
	 * Constructor
	 */
	protected function init() {
		$this->_config = $this->app()->getConfig()->database;

		/** Initialize the table definitions */
		$this->_tableInit();

		/** Init connection */
		$this->_getConnection();

		return;
	}

	/**
	 * Flushes the data from the last query
	 * @return Void
	 */
	private function _flush() {
		$this->affected_rows = '';
		$this->num_rows = 0;
		$this->last_inserted_id = '';
		$this->_result = array();
		$this->timer = false;
		unset($this->_stm);

		return;
	}

	/**
	 * Prepare tables
	 */
	private function _tableInit() {
		foreach ($this->tables as $table) {
			$this->{$table} = '' . $table . '';
		}

		return;
	}

	/**
	 * Checks if the connection to MySQL server is established.
	 * If not, a new connection is made.
	 *
	 * @return \PDO
	 */
	private function _getConnection() {
		if(!is_object(self::$_connection) || !self::$_connection instanceof \PDO) {
			$dsn = sprintf(
				'pgsql:dbname=%s;host=%s',
				$this->_config->name,
				$this->_config->host
			);

			self::$_connection = @new \PDO($dsn, $this->_config->user, $this->_config->password);

			try {
				self::$_connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_WARNING);
			} catch (\PDOException $e) {
			}
		}

		return self::$_connection;
	}

}