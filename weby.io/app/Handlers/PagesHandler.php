<?php

namespace App\Handlers;

use App\Entities\User\UserEntity;
use App\Lib\AbstractHandler;

class PagesHandler extends AbstractHandler
{
    public function about()
    {
        $user = new UserEntity();
        $user->load(1);
    }

    public function index()
    {
    }


    public function page404()
    {
        header('HTTP/1.0 404 Not Found');
    }
}

