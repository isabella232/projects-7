<?php

namespace App\Entities\User;

abstract class UserEntityCrud extends UserEntityProperties
{
    /**
     * Gets user from database based on his service type and service profile ID
     * @param String $serviceType       Eg. 'facebook', 'google' etc.
     * @param String $email             E-mail which was registered on service
     * @return UserEntityCrud $this     Instance of User
*/
    public function loadByService($serviceType, $email) {

        /* @var $data \Webiny\StdLib\StdObject\ArrayObject\ArrayObject */
        $this->_service = $serviceType;
        $this->_email = $email;
        $data = $this->_sqlGetByService();
        $this->populate($data);
        return $this;
    }
}


