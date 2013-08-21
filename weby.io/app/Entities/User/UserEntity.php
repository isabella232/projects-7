<?php

namespace App\Entities\User;

use Webiny\Component\Security\SecurityTrait;
use Webiny\Component\StdLib\StdLibTrait;
use Webiny\Component\StdLib\StdObject\StringObject\StringObject;

class UserEntity extends UserEntityCrud
{
    use StdLibTrait;
    /**
     * Generates username from given email (removes dots from email and everything after @ sign)
     * @param $email
     * @return String
     */
    public static function generateUsername($email)
    {
        $parts = self::str($email)->explode('@');
        return $parts->first()->replace('.', '')->val();
    }
}