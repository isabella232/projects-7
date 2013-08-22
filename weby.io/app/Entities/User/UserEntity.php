<?php

namespace App\Entities\User;

use App\AppTrait;
use App\Entities\Weby\WebyEntity;
use Webiny\Component\Security\SecurityTrait;
use Webiny\Component\StdLib\StdLibTrait;
use Webiny\Component\StdLib\StdObject\StringObject\StringObject;

class UserEntity extends UserEntityCrud
{
    use StdLibTrait, AppTrait;
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

	public function getWebies(){
		return WebyEntity::getAllByUser($this);
	}

	public function getProfileUrl(){
		return $this->app()->getConfig()->app->web_path . $this->getUsername();
	}
}