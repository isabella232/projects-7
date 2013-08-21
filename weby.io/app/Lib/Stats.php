<?php

namespace App\Lib;

use App\AppTrait;
use App\Entities\Weby\WebyEntity;
use Webiny\Component\StdLib\SingletonTrait;

class Stats
{
    use DatabaseTrait, SingletonTrait;

    /**
     * All periods (day, week, month, year)
     */
    const DAY = 'd';
    const WEEK = 'w';
    const MONTH = 'm';
    const YEAR = 'y';

    private $_periodIds = [];

    private $_currentYear;
    private $_currentMonth;
    private $_currentWeek;
    private $_currentDay;
    private $_currentDayOfWeek;
    private $_currentDayOfMonth;
    private $_currentMonthDaysNumber;

    /**
     * Initalizes current date values
     */
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
     * Updates general Webies statistics which includes
     *  total count of Webies created and
     *  separate counts for each widget usage
     */
    public function updateWebiesStats(WebyEntity $weby)
    {
        $allWidgets = $weby->getWidgets();
        foreach ($allWidgets as $widget) {
            /**@var $widget \App\Entities\Widget\WidgetEntity */
            $widgetEvent = 'W_' . strtoupper($widget->getType()) . '_ADDED';
            $this->_updateStats(StatsEvents::$$widgetEvent);
        }

        $this->_updateWebiesCount();
    }

    /**
     * Upgrades statistics for total registered users
     */
    public function updateRegisteredUsers()
    {
        $this->_updateStats(StatsEvents::USER_REGISTERED);
    }

    /**
     * Upgrades statistics for total count of created Webies
     */
    private function _updateWebiesCount()
    {
        $this->_updateStats(StatsEvents::WEBY_CREATED);
    }

    /**
     * Updates stats for given event for increment amount
     * @param $event                    Numeric representation of event (use StatEvent constants)
     * @param int $incrementAmount      Default is 1, but any value can be specified
     */
    private function _updateStats($event, $incrementAmount = 1)
    {
        $this->_sqlGetPeriodIds();

        // uses stored function to emulate ON DUPLICATE KEY UPDATE
        $query = "SELECT UPDATE_STATS(?,?,?)";
        foreach ($this->_periodIds as $id) {
            $bind = array(
                $id,
                $event,
                $incrementAmount
            );
            $this->db()->execute($query, $bind);
        }
    }

    /**
     * Searches for periods, if they don't exists, then it creates them
     * @internal param \App\Lib\Used $event for creating zero valued statistics
     * @return bool
     */
    private function _sqlGetPeriodIds()
    {
        if (!empty($this->_periodIds)) {
            return;
        }
        $periodIds = [];

        $bindValues = [
            self::DAY => $this->_currentDay,
            self::WEEK => $this->_currentWeek,
            self::MONTH => $this->_currentMonth,
            self::YEAR => $this->_currentYear,
        ];

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
            }
            $periodIds[$period] = $id;
        }

        // Return all period IDs in form of an array
        $this->_periodIds = $periodIds;
    }

}