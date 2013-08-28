<?php

namespace App\Entities\Favorite;

use App\AppTrait;
use App\Entities\User\UserEntity;
use App\Entities\Weby\WebyEntity;
use Webiny\Component\Security\SecurityTrait;
use Webiny\Component\StdLib\StdLibTrait;
use Webiny\Component\StdLib\StdObject\StringObject\StringObject;

class FavoriteEntity extends FavoriteEntityCrud
{
    public function loadByUserAndWeby(UserEntity $user, WebyEntity $weby)
    {
        $this->_user = $user->getId();
        $this->_weby = $weby->getId();
        return $this->populate($this->_sqlLoadByUserAndWeby());
    }
}