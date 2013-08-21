<?php

namespace App\Handlers;

use App\AppTrait;
use App\Entities\Weby\WebyEntity;
use App\Lib\DatabaseTrait;
use App\Lib\AbstractHandler;
use App\Lib\Stats;
use App\Lib\UserTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Security\Authentication\Providers\Http\Http;
use Webiny\Component\Security\SecurityTrait;

class EditorHandler extends AbstractHandler
{
    use AppTrait, DatabaseTrait, SecurityTrait, HttpTrait, UserTrait;

    public function index()
    {

    }

    public function save()
    {
        // Create new Weby entity, populate it and save into database
        $weby = new WebyEntity();

        // Get ID of existing Weby and load
        $id = $this->request()->post('id');
        if($id) {
            $weby->load($id);
        }

        $weby->populate($this->request()->post())->save();

        // Update Webies stats
        $stats = Stats::getInstance();
        $stats->updateWebiesStats($weby);

        $this->request()->redirect($this->app()->getConfig()->app->editor_path);
    }
}

