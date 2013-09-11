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

    public function completedOnboarding() {
        return $this->_onboarding;
    }

}