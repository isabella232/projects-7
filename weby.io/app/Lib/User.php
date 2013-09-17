<?php
namespace App\Lib;

use App\Entities\User\UserEntity;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Security\SecurityTrait;
use Webiny\Component\StdLib\SingletonTrait;

/**
 * Used by User Trait which enables us to work with current logged in user anywhere we want
 * Class User
 * @package App\Lib
 */
class User
{
	use SingletonTrait, HttpTrait, SecurityTrait;

	/**
	 * This will store an instance of user
	 * @var null
	 */
	private $_user = null;

	/**
	 * Gets current user
	 * @return UserEntity
	 */
	public function getUser() {
		// Check if user is not instantiated
		if(is_null($this->_user)) {
			if(!$this->security()->getUser() || !$this->security()->getUser()->isAuthenticated()) {
				return false;
			}
			$this->_user = UserEntity::getByEmail($this->security()->getUser()->getUsername());
		}
		return $this->_user;
	}
}

