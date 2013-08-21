<?php
namespace App\Lib;

/**
 * Enables us to work with current logged user anywhere we want
 * Trait UserTrait
 */
trait UserTrait{

    /**
     * @return User
     */
    protected static function user(){
        return User::getInstance();
    }
}