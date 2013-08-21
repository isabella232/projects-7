<?php

namespace App\Entities\User;

abstract class UserEntityCrud extends UserEntityProperties
{
    /**
     * Gets user from database based on his profile email
     * @param String $email             E-mail which was registered on service
     * @return UserEntityCrud $this     Instance of User
     */
    public function getByEmail($email)
    {
        /* @var $data \Webiny\Component\StdLib\StdObject\ArrayObject\ArrayObject */
        $this->_email = $email;
        $data = $this->_sqlLoadByEmail();
        $this->populate($data);
        return $this;
    }
}


