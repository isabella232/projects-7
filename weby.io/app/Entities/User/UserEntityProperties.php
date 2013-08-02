<?php

namespace App\Entities\User;


abstract class UserEntityProperties extends UserEntityStorage
{
    /**
     * @return mixed
     */
    public function getCreatedOn()
    {
        return $this->datetime($this->_createdOn);
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->_email;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->_id;
    }


}