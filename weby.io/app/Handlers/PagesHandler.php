<?php

namespace App\Handlers;

use App\Lib\AbstractHandler;
use Webiny\Component\Security\SecurityTrait;

class PagesHandler extends AbstractHandler
{
    use SecurityTrait;

    public function index()
    {
    }

    public function page404()
    {
        header('HTTP/1.0 404 Not Found');
    }

}

