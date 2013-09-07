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

    /**
     * Gets all favorite Webies for given user (can be passed as an object or pure ID)
     * @param $userId
     * @return array
     */
    public static function getAllFavoritesByUser($userId)
    {
        $userId = $userId instanceof UserEntity ? $userId->getId() : $userId;
        $query = "SELECT weby FROM " . self::_getDb()->w_favorite . " WHERE \"user\"=?
                     ORDER BY created_on DESC";
        $result = self::_getDb()->execute($query, [$userId])->fetchColumn();

        $favorites = [];

        if ($result) {
            foreach ($result as $webyId) {
                $newFavorite = new FavoriteEntity();
                $newFavorite->loadByWebyAndUser($webyId, $userId);
                $favorites[] = clone $newFavorite;
            }
        }

        return $favorites;
    }
}