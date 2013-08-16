<?php

namespace App\Entities\User;

use App\Entities\EntityAbstract;
use Webiny\StdLib\StdObject\ArrayObject\ArrayObject;

abstract class UserEntityStorage extends EntityAbstract
{
    protected $_id = 0;
    protected $_service = '';
    protected $_email = '';
    protected $_firstName = '';
    protected $_lastName = '';

    protected $_createdOn;

    /**
     * Saves user into the database with it's service type
     * @return \App\Lib\DatabaseResult
     */
    protected function _sqlSave()
    {
        if ($this->_id == 0) {
            $query = "INSERT INTO {$this->_getDb()->w_user} (service, email, first_name, last_name)
                        VALUES (?, ?, ?, ?)";
            $bind = [$this->_id, $this->_service, $this->_email, $this->_firstName, $this->_lastName];
            return $this->_getDb()->execute($query, $bind);
        }

        $query = "UPDATE {$this->_getDb()->w_user} SET email=?, first_name=?, last_name=? WHERE id=?";
        $bind = [$this->_email, $this->_firstName, $this->_lastName, $this->_id];
        return $this->_getDb()->execute($query, $bind);
    }

    /**
     * Loads user
     * @return ArrayObject|bool
     */
    protected function _sqlLoad()
    {
        $query = "SELECT * FROM {$this->_getDb()->w_user} WHERE id=? LIMIT 1";
        $bind = array($this->_id);
        return $this->_getDb()->execute($query, $bind)->fetchAll();
    }

    /**
     * Deletes user
     * @return \App\Lib\DatabaseResult
     */
    protected function _sqlDelete()
    {
        $query = "DELETE FROM {$this->_getDb()->w_user} WHERE id=?";
        $bind = array($this->_id);
        return $this->_getDb()->execute($query, $bind);
    }

    /**
     * Queries the database for user based on his service type (fb, g+ etc.) and service registered email
     * @return \ArrayObject|bool
     */
    protected function _sqlGetByService() {
        $query = "SELECT * FROM {$this->_getDb()->w_user} WHERE service=? AND email=? LIMIT 1";
        $bind = array($this->_service, $this->_email);
        return $this->_getDb()->execute($query, $bind)->fetchArray();
    }

}