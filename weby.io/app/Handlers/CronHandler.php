<?php

namespace App\Handlers;

use App\Lib\AbstractHandler;
use App\Lib\Stats;

class CronHandler extends AbstractHandler
{
    /**
     * This must execute and the end of the day, to check how many users were active and how many inactive
     */
    public function checkInactiveUsers()
    {
        $wStats = Stats::getInstance();
        $wStats->updateDailyActiveUsersCount();
        die('Cron finished successfully.');
    }

}
