<?php

namespace App\Entities\Weby;


use App\Entities\EntityAbstract;
use App\Entities\User\UserEntity;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\StdLib\StdObject\ArrayObject\ArrayObject;

abstract class WebyEntityStorage extends EntityAbstract
{
	use HttpTrait;

    protected $_id = '';
    protected $_title = 'Untitled';
    protected $_slug = 'untitled';
    protected $_content = [];
    protected $_settings = [];
    protected $_user = 0;
    protected $_createdOn = '';
    protected $_modifiedOn = '';
	protected $_storage = '';

    /**
     * Saves weby into the database with it's service type
     * @return \App\Lib\DatabaseResult|bool
     */
    protected function _sqlSave()
    {
        if ($this->_id == '') {
            $this->_id = uniqid();
            $query = 'INSERT INTO ' . $this->_getDb()->w_weby . ' (id, title, slug, content, settings, "user", created_on)
                        VALUES (?, ?, ?, ?, ?, ?, NOW())';
            $bind = [
                $this->_id,
                $this->_title,
                $this->_slug,
                json_encode($this->_content),
                json_encode($this->_settings),
                is_object($this->_user) ? $this->_user->getId() : $this->_user
            ];

            return $this->_getDb()->execute($query, $bind);
        }

        $query = "UPDATE {$this->_getDb()->w_weby} SET title=?, slug=?, content=?, settings=?, modified_on=NOW() WHERE id=?";
        $bind = [
            $this->_title,
            $this->_slug,
            json_encode($this->_content),
            json_encode($this->_settings),
            $this->_id
        ];

        return $this->_getDb()->execute($query, $bind);
    }

	/**
	 * Set storage folder
	 * @return \App\Lib\DatabaseResult
	 */
	protected function _sqlSetStorage(){
		$query = "UPDATE {$this->_getDb()->w_weby} SET storage=? WHERE id=?";
		$bind = [
			$this->_storage,
			$this->_id
		];

		return $this->_getDb()->execute($query, $bind);
	}

    /**
     * Loads weby
     * @return ArrayObject|bool
     */
    protected function _sqlLoad()
    {
        $query = "SELECT * FROM {$this->_getDb()->w_weby} WHERE id=? LIMIT 1";
        $bind = array($this->_id);

        return $this->_getDb()->execute($query, $bind)->fetchArray();
    }

    /**
     * Deletes weby
     * @return \App\Lib\DatabaseResult|bool
     */
    protected function _sqlDelete()
    {
        $query = "DELETE FROM {$this->_getDb()->w_weby} WHERE id=?";
        $bind = array($this->_id);

        return $this->_getDb()->execute($query, $bind);
    }

    /**
     * Loads weby for given user
     *
     * @param \App\Entities\User\UserEntity $user
     *
     * @return ArrayObject|bool
     */
    protected static function _sqlLoadByUser(UserEntity $user)
    {
        $query = 'SELECT id, count(*) OVER() total_count FROM ' . self::_getDb()->w_weby . ' WHERE "user"=? ORDER BY created_on DESC';
        $bind = [$user->getId()];

		if(self::request()->query('$top')){
			$query .= " LIMIT ?";
			$bind[] = self::request()->query('$top');
		}

		if(self::request()->query('$skip')){
			$query .= " OFFSET ?";
			$bind[] = self::request()->query('$skip');
		}

        $res = self::_getDb()->execute($query, $bind)->fetchAll();
        if (!$res) {
            return [];
        }

		self::$_totalRows = $res->first()->key('total_count');
		$ids = [];
		foreach($res as $r){
			$ids[] = $r->key('id');
		}
        return $ids;
    }

    protected function _sqlGetHitCount()
    {
        $query = "SELECT value FROM {$this->_getDb()->w_stat_by_ref} WHERE ref_type=? AND ref_id=?";
        $bind = ['hit_weby', $this->_id];
        return $this->_getDb()->execute($query, $bind)->fetchValue();
    }

    protected function _sqlGetFavoriteCount()
    {
        $query = "SELECT COUNT(weby) FROM {$this->_getDb()->w_favorite} WHERE weby=?";
        $bind = [$this->_id];
        return $this->_getDb()->execute($query, $bind)->fetchValue();
    }

}