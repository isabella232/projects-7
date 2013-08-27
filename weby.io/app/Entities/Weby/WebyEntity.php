<?php

namespace App\Entities\Weby;

use App\AppTrait;
use App\Entities\User\UserEntity;

class WebyEntity extends WebyEntityCrud
{

	use AppTrait;

    public static function getAllByUser(UserEntity $user)
    {
        $webies = self::_sqlLoadByUser($user);
        $tmp = [];
        foreach ($webies as $wId) {
            $weby = new WebyEntity();
            $tmp[] = $weby->load($wId);
        }
        return $tmp;
    }

	public function getEditorUrl() {
		return $this->app()->getConfig()->app->web_path . $this->getUser()->getUsername() . '/' . $this->getId() . '/';
	}

	public function getPublicUrl() {
		return $this->app()->getConfig()->app->web_path . $this->getUser()
														  ->getUsername() . '/' . $this->getSlug() . '/' . $this->getId() . '/';
	}

	public function toJson() {
		return json_encode($this->toArray());

	}

	public function toArray() {
		return [
			'id'       => $this->_id,
			'username' => $this->getUser()->getUsername(),
			'title'    => $this->_title,
			'content'  => $this->_content,
			'settings' => $this->_settings
		];
	}
}