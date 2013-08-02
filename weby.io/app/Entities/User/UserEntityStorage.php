<?php

namespace App\Entities\User;

use App\Entities\EntityAbstract;

abstract class UserEntityStorage extends EntityAbstract
{
    protected $_id;
    protected $_email;
    protected $_createdOn;

    protected function _sqlSave()
    {
        //
    }

    protected function _sqlLoad()
    {
        $query = "SELECT * FROM {$this->_getDb()->user} WHERE id=? LIMIT 1";
        $bind = array($this->_id);
        return $this->_getDb()->execute($query, $bind)->fetchAll();
    }

    protected function _sqlDelete()
    {
        //
    }


}

