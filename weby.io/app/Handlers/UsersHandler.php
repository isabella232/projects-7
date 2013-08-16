<?php

namespace App\Handlers;

use App\AppTrait;
use App\Entities\User\ServiceType;
use App\Entities\User\UserEntity;
use App\Lib\AbstractHandler;
use App\Lib\Stats;
use Webiny\StdLib\StdObject\StringObject\StringObject;

class UsersHandler extends AbstractHandler
{
    use AppTrait;

    /**
     * This will insert logged user into the database on first login to Weby.io
     */
    public function checkUserExists()
    {
        // Get data from OAuth service
        $serviceData = $this->request()->session('oauth_user')->get('oauth2_user');
        // Firstly, we check which service did the user log from
        $serviceType = $this->getServiceFromLink($serviceData->profileUrl);

        // Load user by service type
        $user = new UserEntity();
        $user->loadByService($serviceType, $serviceData->email);

        // If user exists, then just redirect, else save it, update registered users statistics, and then redirect
        if ($user->getId() == 0) {
            $user->populate($serviceData)->save();
            // Registered users - update stats

            $stats = Stats::getInstance();
            $stats->updateRegisteredUsers();
        }
        // Redirect to editor
        $this->request()->redirect($this->app()->getConfig()->app->web_path . 'my/');
    }
}