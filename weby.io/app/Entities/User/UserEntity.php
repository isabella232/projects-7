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
                /**@var $weby \App\Entities\Weby\WebyEntity */
                $tmp[] = [
                    'id' => $weby->getId(),
                    'thumbnail' => 'http://graph.facebook.com/1594713365/picture?type=large',
                    'title' => $weby->getTitle(),
                    'slug' => $weby->getSlug(),
                    'modified_on' => date('F d, Y \a\t h:m a', strtotime($weby->getModifiedOn())),
                    'public_url' => $weby->getPublicUrl(),
                    'editor_url' => $weby->getEditorUrl(),
                    'hits' => $weby->getHitCount(),
                    'favorites' => $weby->getFavoriteCount(),
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

    public function getFavoriteWebies($json = false)
    {
        // Check to see if we already have loaded all favorites
        if (is_null($this->_favoriteWebies)) {
            $favorites = $this->_sqlGetFavoriteWebies();
            if ($favorites) {
                $weby = new WebyEntity();
                foreach ($favorites as $data) {
                    $weby->load($data['weby']);
                    $weby->setAddedToFavoritesTime($data['created_on']);
                    $this->_favoriteWebies[] = clone $weby;
                }
            } else {
                $this->_favoriteWebies = [];
            }
        }

        // If JSON was true, then we have to convert all objects to JSON and return that
        if ($json) {
            $tmp = [];
            foreach ($this->_favoriteWebies as $weby) {
                /**@var $weby \App\Entities\Weby\WebyEntity */
                $tmp[] = [
                    'id' => $weby->getId(),
                    'thumbnail' => 'http://graph.facebook.com/1594713365/picture?type=large',
                    'title' => $weby->getTitle(),
                    'slug' => $weby->getSlug(),
                    'public_url' => $weby->getPublicUrl(),
                    'hits' => $weby->getHitCount(),
                    'favorites' => $weby->getFavoriteCount(),
                    'addedToFavoritesTime' => $weby->getAddedToFavoritesTime(),
                ];
            }
            return json_encode($tmp);
        }

        return $this->_favoriteWebies;
    }

}