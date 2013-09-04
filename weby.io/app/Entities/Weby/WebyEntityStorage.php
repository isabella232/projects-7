<?php

namespace App\Entities\Weby;


use App\Entities\EntityAbstract;
use App\Entities\User\UserEntity;
use Webiny\Component\StdLib\StdObject\ArrayObject\ArrayObject;

abstract class WebyEntityStorage extends EntityAbstract
{
    protected $_id = '';
    protected $_title = 'Untitled';
    protected $_slug = 'untitled';
    protected $_content = [];
    protected $_settings = [];
    protected $_user = 0;
    protected $_createdOn = '';
    protected $_modifiedOn = '';

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
        $query = 'SELECT id FROM ' . self::_getDb()->w_weby . ' WHERE "user"=?';
        $bind = array($user->getId());

        $res = self::_getDb()->execute($query, $bind)->fetchColumn();
        if (!$res) {
            return [];
        }
        return $res;
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