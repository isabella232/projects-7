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
     *
     * @param $email
     *
     * @return String
     */
    public static function generateUsername($email)
    {
        $parts = self::str($email)->explode('@');

        return $parts->first()->replace('.', '')->val();
    }

    public function getWebies($json = false)
    {
        $webies = WebyEntity::getAllByUser($this);
        if ($json) {
            $tmp = [];
            foreach($webies as $weby){
                $tmp[] = [
                    'id' => $weby->getId(),
                    'title' => $weby->getTitle(),
                    'slug' => $weby->getSlug(),
                    'modified_on' => $weby->getModifiedOn()
                ];
            }
            $webies = json_encode($tmp);
        }
        return $webies;
    }


    public function getProfileUrl()
    {
        return $this->app()->getConfig()->app->web_path . $this->getUsername() . '/';
    }
}