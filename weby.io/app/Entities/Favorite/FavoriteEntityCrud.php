<?php

namespace App\Entities\Favorite;

use App\Entities\User\UserEntity;
use App\Entities\Weby\WebyEntity;

abstract class FavoriteEntityCrud extends FavoriteEntityProperties
{

    /**
     * Loads favorite by given Weby and user
     * @param $weby WebyEntity|String Can be pure string, or object (handled internally)
     * @param $user UserEntity|Integer Can be pure int, or object (handled internally)
     * @return $this
     */
    public function loadByWebyAndUser($weby, $user)
    {
        $weby = $weby instanceof WebyEntity ? $weby->getId() : $weby;
        $user = $user instanceof UserEntity ? $user->getId() : $user;

        if (empty($weby) || empty($user)) {
            return $this;
        }
        $this->_weby = $weby;
        $this->_user = $user;

        $data = $this->_sqlLoadByWebyAndUser();

        if (!$data->count()) {
            $this->_weby = false;
            $this->_user = false;
            return $this;
        }
        $this->_populateFromDb($data);
        $this->_onAfterLoad();
        return $this;
    }

}


