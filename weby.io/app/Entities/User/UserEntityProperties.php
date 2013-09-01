<?php

namespace App\Entities\User;


use App\Entities\Weby\WebyEntity;

abstract class UserEntityProperties extends UserEntityStorage
{
    /**
     * Favorite Webies of an user (array of WebyEntity objects)
     */
    protected $_favoriteWebies = null;

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

    /**
     * @return string
     */
    public function getFirstName()
    {
        return $this->_firstName;
    }

    /**
     * @return string
     */
    public function getLastName()
    {
        return $this->_lastName;
    }

    /**
     * @return string
     */
    public function getAvatarUrl()
    {
        return $this->_avatarUrl;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->_username;
    }

    public function getFavoriteWebies($json = false)
    {
        // Check to see if we already have loaded all favorites
        if (is_null($this->_favoriteWebies)) {
            $favorites = $this->_sqlGetFavoriteWebies();
            if ($favorites) {
                $weby = new WebyEntity();
                foreach ($favorites as $id) {
                    $weby->load($id);
                    $this->_favoriteWebies[] = clone $weby;
                }
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
                    'modified_on' => date('F d, Y \a\t h:m a', strtotime($weby->getModifiedOn())),
                    'public_url' => $weby->getPublicUrl(),
                    'editor_url' => $weby->getEditorUrl(),
                    'hits' => $weby->getHitCount(),
                    'favorites' => $weby->getFavoriteCount(),
                ];
            }
            return json_encode($tmp);
        }

        return $this->_favoriteWebies;
    }


}