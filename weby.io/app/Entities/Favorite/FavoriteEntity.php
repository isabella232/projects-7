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

    public static function getAllFavoritesByUser($userId, $page = 1, $limit = 10, $orderBy = 'created_on', $orderType = 'DESC')
    {
        $userId = $userId instanceof UserEntity ? $userId->getId() : $userId;

        $limitOffset = "OFFSET " . ($page - 1) * $limit . " LIMIT " . $limit;
        $query = "SELECT weby FROM " . self::_getDb()->w_favorite . " WHERE \"user\"=?
                     ORDER BY {$orderBy} {$orderType} {$limitOffset}";
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