<?php

namespace App\Entities\Weby;


use App\Entities\User\UserEntity;

abstract class WebyEntityProperties extends WebyEntityStorage
{

    /**
     * Total count of hits to this Weby
     */
    protected $_hitCount = null;

    /**
     * Total count of times somebody put this Weby to his favorite's list
     */
    protected $_favoriteCount = null;

    /**
     * Here we can store the time when this Weby was added to favorites (used by favorites section)
     */
    protected $_addedToFavoritesTime = null;

    /**
     * @return int
     */
    public function getSlug()
    {
        return $this->_slug;
    }

    /**
     * Holds array of widget objects
     * @var array
     */
    protected $_widgets = array();

    /**
     * Returns array of Widget objects
     * @return array
     */
    public function getWidgets()
    {
        return $this->_widgets;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->_content;
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
    public function getId()
    {
        return $this->_id;
    }

    /**
     * @return string
     */
    public function getModifiedOn()
    {
        return $this->_modifiedOn;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->_title;
    }

    /**
     * @return UserEntity
     */
    public function getUser()
    {
        if (!$this->_user instanceof UserEntity) {
            $user = new UserEntity();
            $user->load($this->_user);
            $this->_user = $user;
        }
        return $this->_user;
    }

    public function getHitCount()
    {
        if(!$this->_hitCount) {
            $count = $this->_sqlGetHitCount();
            $this->_hitCount = $count ? $count : 0;
        }
        return $this->_hitCount;
    }

    public function getFavoriteCount()
    {
        if(!$this->_favoriteCount) {
            $this->_favoriteCount = $this->_sqlGetFavoriteCount();
        }
        return $this->_favoriteCount;
    }

    /**
     * @return mixed
     */
    public function getAddedToFavoritesTime()
    {
        return $this->_addedToFavoritesTime;
    }

    /**
     * @param \App\Entities\User\UserEntity $user
     * @return $this
     */
    public function setUser(UserEntity $user)
    {
        $this->_user = $user;
        return $this;
    }

    /**
     * Sets the time when this Weby was added to favorites (used by Favorites section)
     * @param $time
     * @return $this
     */
    public function setAddedToFavoritesTime($time) {
        $this->_addedToFavoritesTime = $time;
        return $this;
    }
}