<?php

namespace App\Entities\Weby;

use App\Entities\EntityAbstract;
use Webiny\StdLib\StdObject\ArrayObject\ArrayObject;

abstract class WebyEntityStorage extends EntityAbstract
{
    private $_id;

    /**
     * Saves weby into the database with it's service type
     * @return \App\Lib\DatabaseResult|bool
     */
    protected function _sqlSave()
    {

        // Must complete
        if ($this->_id == 0) {
            $query = "INSERT INTO {$this->_getDb()->w_weby} (service, email, first_name, last_name)
                        VALUES (?, ?, ?, ?)";
            $bind = [$this->_id, $this->_service, $this->_email, $this->_firstName, $this->_lastName];
            return $this->_getDb()->execute($query, $bind);
        }

        $query = "UPDATE {$this->_getDb()->w_weby} SET email=?, first_name=?, last_name=? WHERE id=?";
        $bind = [$this->_email, $this->_firstName, $this->_lastName, $this->_id];
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
        return $this->_getDb()->execute($query, $bind)->fetchAll();
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

}