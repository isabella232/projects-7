<?php

namespace App\Entities\Favorite;


use App\Entities\User\UserEntity;
use App\Entities\Weby\WebyEntity;

abstract class FavoriteEntityProperties extends FavoriteEntityStorage
{
    /**
     * @return mixed
     */
    public function getUser()
    {
        if (!$this->_user instanceof UserEntity) {
            $user = new UserEntity;
            $this->_user = $user->load($this->_user);
        }
        return $this->_user;
    }

    /**
     * @return mixed
     */
    public function getWeby()
    {
        if (!$this->_weby instanceof WebyEntity) {
            $weby = new WebyEntity();
            $this->_weby = $weby->load($this->_weby);
        }
        return $this->_weby;
    }

    /**
     * @return string
     */
    public function getCreatedOn()
    {
        return $this->_createdOn;
    }

    /**
     * @return int
     */
    public function getOwnerId()
    {
        return $this->_ownerId;
    }


}