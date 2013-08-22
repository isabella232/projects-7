<?php

namespace App\Entities\Weby;


use App\Entities\EntityAbstract;
use Webiny\Component\StdLib\StdObject\ArrayObject\ArrayObject;

abstract class WebyEntityStorage extends EntityAbstract
{
	protected $_id = '';
	protected $_title = '';
	protected $_slug = 0;
	protected $_content = '';
	protected $_user = 0;
	protected $_createdOn = '';
	protected $_modifiedOn = '';

	/**
	 * Saves weby into the database with it's service type
	 * @return \App\Lib\DatabaseResult|bool
	 */
	protected function _sqlSave() {
		if($this->_id == '') {
			$this->_id = uniqid();
			$query = 'INSERT INTO ' . $this->_getDb()->w_weby . ' (id, title, slug, content, "user", created_on)
                        VALUES (?, ?, ?, ?, ?, NOW())';
			$bind = [
				$this->_id,
				$this->_title,
				$this->_slug,
				json_encode($this->_content),
				is_object($this->_user) ? $this->_user->getId() : $this->_user
			];

			return $this->_getDb()->execute($query, $bind);
		}

		$query = "UPDATE {$this->_getDb()->w_weby} SET title=?, slug=?, content=?, modified_on=NOW() WHERE id=?";
		$bind = [
			$this->_title,
			$this->_slug,
			json_encode($this->_content),
			$this->_id
		];

		return $this->_getDb()->execute($query, $bind);
	}

	/**
	 * Loads weby
	 * @return ArrayObject|bool
	 */
	protected function _sqlLoad() {
		$query = "SELECT * FROM {$this->_getDb()->w_weby} WHERE id=? LIMIT 1";
		$bind = array($this->_id);

		return $this->_getDb()->execute($query, $bind)->fetchAll();
	}

	/**
	 * Deletes weby
	 * @return \App\Lib\DatabaseResult|bool
	 */
	protected function _sqlDelete() {
		$query = "DELETE FROM {$this->_getDb()->w_weby} WHERE id=?";
		$bind = array($this->_id);

		return $this->_getDb()->execute($query, $bind);
	}

}