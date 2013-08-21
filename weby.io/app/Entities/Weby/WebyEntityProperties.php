<?php

namespace App\Entities\Weby;


use App\Entities\User\UserEntity;

abstract class WebyEntityProperties extends WebyEntityStorage
{
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
    public function getWidgets() {
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
        if(!$this->_user instanceof UserEntity) {
            $user = new UserEntity();
            $user->load($this->_user);
            $this->_user = $user;
        }
        return $this->_user;
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

}