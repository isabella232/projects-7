<?php

namespace App\Lib;

use App\AppTrait;
use App\Entities\Weby\WebyEntity;
use Webiny\StdLib\SingletonTrait;

class Stats
{
    use DatabaseTrait, SingletonTrait;

    const DAY = 'd';
    const WEEK = 'w';
    const MONTH = 'm';
    const YEAR = 'y';

    private $_periodIds;

    private $_currentYear;
    private $_currentMonth;
    private $_currentWeek;
    private $_currentDay;
    private $_currentDayOfWeek;
    private $_currentDayOfMonth;
    private $_currentMonthDaysNumber;

    public function init()
    {
        $this->_currentYear = date('Y');
        $this->_currentMonth = date('n');
        $this->_currentWeek = date('W');
        $this->_currentDay = date('z');
        $this->_currentDayOfWeek = date('N');
        $this->_currentDayOfMonth = date('j');
        $this->_currentMonthDaysNumber = date('t');
    }

    /**
     * Updates general Webies statistics which includes global:
     *  - total count of Webies created
     *  - separate total counts for each widget
     */
    public function updateWebyStats(WebyEntity $weby)
    {
    }

    /**
     * Upgrades statistics for total registered users
     */
    public function updateRegisteredUsers()
    {
        $this->updateStats(StatsEvents::USER_REGISTERED);
    }

    private function updateStats($event, $incrementAmount = 1)
    {
        $this->_sqlGetPeriodIds($event);

        $query = "UPDATE {$this->db()->w_stat} SET value=value+? WHERE period=? AND event=?";
        foreach ($this->_periodIds as $id) {
            $bind = array(
                $incrementAmount,
                $id,
                $event
            );
            $this->db()->execute($query, $bind);
        }
    }

    /**
     * Searches for periods, if they don't exists, then it creates them
     * @param $event        Used for creating zero valued statistics
     */
    private function _sqlGetPeriodIds($event)
    {
        $periodIds = [];

        $bindValues = array(
            self::DAY => $this->_currentDay,
            self::WEEK => $this->_currentWeek,
            self::MONTH => $this->_currentMonth,
            self::YEAR => $this->_currentYear,
        );

        $periodsQuery = "SELECT id FROM {$this->db()->w_stat_period} WHERE year=? AND type=? AND value=?";

        foreach ($bindValues as $period => $current) {
            $bind = [$this->_currentYear, $period, $current];
            $id = $this->db()->execute($periodsQuery, $bind)->fetchValue();

            // If our SELECT didn't find current periods, then we create them
            if (!$id) {
                // Insert new periods
                $query = "INSERT INTO {$this->db()->w_stat_period} (year, type, value) VALUES (?,?,?)";
                $this->db()->execute($query, [$this->_currentYear, $period, $current]);
                $id = $this->db()->lastInsertedId($this->db()->w_stat_period);

                // Insert zero values into statistics table for newly created periods
                $query = "INSERT INTO {$this->db()->w_stat} (period, event) VALUES (?,?)";
                $this->db()->execute($query, [$id, $event]);
            }
            $periodIds[$period] = $id;
        }

        // Return all period IDs in form of an array
        $this->_periodIds = $periodIds;
    }

}