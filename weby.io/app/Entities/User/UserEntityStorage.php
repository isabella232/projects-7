<?php
namespace App\Entities\User;

use App\Entities\EntityAbstract;
use Webiny\StdLib\StdObject\ArrayObject\ArrayObject;

abstract class UserEntityStorage extends EntityAbstract
{
    protected $_id = 0;
    protected $_serviceName = '';
    protected $_email = '';
    protected $_firstName = '';
    protected $_lastName = '';
    protected $_createdOn = '';
    protected $_avatarUrl = '';

    /**
     * Saves user into the database with it's service type
     * @return \App\Lib\DatabaseResult
     */
    protected function _sqlSave()
    {
        if ($this->_id == 0) {
            $query = "INSERT INTO {$this->_getDb()->w_user} (service_name, email, first_name, last_name, avatar_url, created_on)
                        VALUES (?, ?, ?, ?, ?, NOW()) RETURNING id";
            $bind = [$this->_serviceName, $this->_email, $this->_firstName, $this->_lastName, $this->_avatarUrl];
            $this->_id = $this->_getDb()->execute($query, $bind)->fetchValue();
            return true;
        }

        $query = "UPDATE {$this->_getDb()->w_user} SET service_name=?, first_name=?, last_name=?, avatar_url=? WHERE id=?";

        $bind = [$this->_serviceName, $this->_firstName, $this->_lastName, $this->_avatarUrl, $this->_id];
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
    protected function _sqlLoadByEmail() {
        $query = "SELECT * FROM {$this->_getDb()->w_user} WHERE email=? LIMIT 1";
        $bind = array($this->_email);
        return $this->_getDb()->execute($query, $bind)->fetchArray();
    }

}