<?php
namespace App\Entities\Favorite;

use App\Entities\EntityAbstract;
use Webiny\Component\StdLib\StdObject\ArrayObject\ArrayObject;

abstract class FavoriteEntityStorage extends EntityAbstract
{
    /**
     * No objects, just pure integers, because of load-reducing
     */
    protected $_id = 0;
    protected $_user = 0;
    protected $_weby = 0;

    /**
     * Saves user into the database with it's service type
     * @return \App\Lib\DatabaseResult
     */
    protected function _sqlSave()
    {
        $query = "INSERT INTO {$this->_getDb()->w_favorite} (\"user\", weby, created_on)
                        VALUES (?, ?, NOW()) RETURNING id";
        $bind = [$this->_user, $this->_weby];
        $this->_id = $this->_getDb()->execute($query, $bind)->fetchValue();
        return true;
    }

    /**
     * Loads user
     * @return ArrayObject|bool
     */
    protected function _sqlLoad()
    {
        $query = "SELECT * FROM {$this->_getDb()->w_favorite} WHERE id=? LIMIT 1";
        $bind = array($this->_id);
        return $this->_getDb()->execute($query, $bind)->fetchAll();
    }

    /**
     * Deletes user
     * @return \App\Lib\DatabaseResult
     */
    protected function _sqlDelete()
    {
        $query = "DELETE FROM {$this->_getDb()->w_favorite} WHERE id=?";
        $bind = array($this->_id);
        return $this->_getDb()->execute($query, $bind);
    }

    /**
     * Gets favorite entry (to see if given user has put given Weby to his favorites list
     * @return \ArrayObject|bool
     */
    protected function _sqlLoadByUserAndWeby() {
        $query = "SELECT * FROM {$this->_getDb()->w_favorite} WHERE \"user\"=? AND weby=? LIMIT 1";
        $bind = array($this->_user, $this->_weby);
        return $this->_getDb()->execute($query, $bind)->fetchArray();
    }
}