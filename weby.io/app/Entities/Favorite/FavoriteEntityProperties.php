<?php

namespace App\Entities\Favorite;


abstract class FavoriteEntityProperties extends FavoriteEntityStorage
{
    /**
     * @return int
     */
    public function getId()
    {
        return $this->_id;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->_user;
    }

    /**
     * @return mixed
     */
    public function getWeby()
    {
        return $this->_weby;
    }

    /**
     * @param null $user
     * @return $this
     */
    public function setUser($user)
    {
        $this->_user = $user;
        return $this;
    }

    /**
     * @param null $weby
     * @return $this
     */
    public function setWeby($weby)
    {
        $this->_weby = $weby;
        return $this;
    }

}