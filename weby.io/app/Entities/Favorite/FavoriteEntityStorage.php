<?php
namespace App\Entities\Favorite;

use App\Entities\EntityAbstract;
use App\Entities\Weby\WebyEntity;
use Webiny\Component\StdLib\StdObject\ArrayObject\ArrayObject;

abstract class FavoriteEntityStorage extends EntityAbstract
{
    /**
     * No objects, just pure integers, because of load-reducing
     */
    protected $_user = false;
    protected $_weby = false;
    protected $_ownerId = 0;
    protected $_createdOn = '';

    /**
     * Saves user into the database with it's service type
     * @return \App\Lib\DatabaseResult
     */
    protected function _sqlSave()
    {
        $query = "INSERT INTO {$this->_getDb()->w_favorite} (\"user\", weby, owner_id, created_on)
                        VALUES (?, ?, ?, NOW())";
        $bind = [$this->_user, $this->_weby, $this->_ownerId];
        return $this->_getDb()->execute($query, $bind);
    }

    /**
     * Blank, abstract method takes one parameter, we need two (loading by Weby and user)
     */
    protected function _sqlLoad() {}

    /**
     * Loads favorite entry by given Weby and user
     * @return ArrayObject|bool
     */
    protected function _sqlLoadByWebyAndUser()
    {
        $query = "SELECT * FROM {$this->_getDb()->w_favorite} WHERE weby=? AND \"user\"=? LIMIT 1";
        $bind = array($this->_weby, $this->_user);
        return $this->_getDb()->execute($query, $bind)->fetchAll();
    }

    /**
     * Deletes user
     * @return \App\Lib\DatabaseResult
     */
    protected function _sqlDelete()
    {
        $query = "DELETE FROM {$this->_getDb()->w_favorite} WHERE weby=? AND \"user\"=?";
        $bind = array($this->_weby, $this->_user);
        return $this->_getDb()->execute($query, $bind);
    }

}