<?php

namespace App\Lib;

use App\AppTrait;
use App\Entities\User\UserEntity;
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

    // Used to store ID's of current periods
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
     * Updates general Weby widgets statistics
     * @param $webyWidgetsCount Array Has to be in format eg. ['instagram' => -4, 'facebook' => 3]
     * @internal param Array $weby
     */
    public function updateWidgetsCount($webyWidgetsCount)
    {
        foreach($webyWidgetsCount as $widget => $count) {
            $widgetAdded = 'W_' . strtoupper($widget) . '_ADDED';
            $this->_updateStats(StatsEvents::$$widgetAdded, $count);
        }
    }

    /**
     * Upgrades statistics for total registered users
     */
    public function updateRegisteredUsersCount()
    {
        $this->_updateStats(StatsEvents::USER_REGISTERED);
    }

    /**
     * Upgrades statistics for total count of created Webies
     */
    public function updateWebiesCreated()
    {
        $this->_updateStats(StatsEvents::WEBY_CREATED);
    }

    /**
     * Updates hits for particular Weby
     * @param WebyEntity $weby
     * @param int $increment
     */
    public function updateWebyHits(WebyEntity $weby, $increment = 1)
    {
        $this->_sqlUpdateStatsForRef('hit_weby', $weby->getId(), $increment);
    }

    /**
     * Updates user's count of Webies for current period
     * @param \App\Entities\User\UserEntity $user
     * @param int $increment
     * @internal param \App\Entities\User\UserEntity|\App\Entities\Weby\WebyEntity $weby
     */
    public function updateUsersWebiesCount(UserEntity $user, $increment = 1)
    {
        $this->_sqlUpdateStatsForRef('creation_user_weby', $user->getId(), $increment);
    }

    /**
     * Gets overall stats for selected event
     * @param String $event Event, use class constants (Stat_Events) for easier approach
     * @return Array in which keys are periods - [d], [w], [m], [y]
     */
    public function getOverallStatsForEvent($event)
    {
        $query = "SELECT SUM(s.value) FROM {$this->db()->w_stat_period} sp
                    JOIN {$this->db()->w_stat} s ON s.period = sp.id
                    WHERE sp.type=? AND s.event=?";

        // get only year stats for selected event
        $bind = array(
            'y',
            $event
        );

        // todo: default 0
        return $stmt = $this->db()->execute($query, $bind)->fetchValue();
    }

    /**
     * Gets stats by day for given event and current week
     * @param String $event
     * @return Array
     */
    public function getCurrentWeekStatsForEvent($event)
    {
        // $currentDay : days (from 1 to 7) - if today is tuesday (day number 189),
        // that means beggining week day number is 189 - (2-1), tuesday is 2nd day of the week
        $weekStartingDay = $this->_currentDay - ($this->_currentDayOfWeek - 1);
        $weekLastDay = $weekStartingDay + 7;
        $result = $this->_sqlGetStatsByDayForEvent($event, $weekStartingDay, $weekLastDay);
        $formatted = array();

        foreach ($result as $data) {
            $formatted[$data['day'] - $weekStartingDay] = $data['value'];
        }

        return $formatted;
    }

    /**
     * Gets stats by day for given event and current month
     * @param String $event
     * @return Array
     */
    public function getCurrentMonthStatsForEvent($event)
    {
        // current day of the month is a number (1-31) - if month starts with day 181(monday) and today is wednesday(183)
        // then we can get starting day number from currentDay(183) - (wednesday(3)-1) => 183-2=181
        $monthStartingDay = $this->_currentDay - ($this->_currentDayOfMonth - 1);
        $monthLastDay = $monthStartingDay + ($this->_currentMonthDaysNumber - 1);
        $result = $this->_sqlGetStatsByDayForEvent($event, $monthStartingDay, $monthLastDay);
        $formatted = array();

        foreach ($result as $data) {
            $formatted[$data['day'] - ($monthStartingDay - 1)] = $data['value'];
        }

        return $formatted;
    }

    /**
     * Gets stats by month for given event and current event
     * @param String $event
     * @return Array
     */
    public function getCurrentYearStatsForEvent($event)
    {
        $result = $this->_sqlGetStatsByMonthForEvent($event);
        $formatted = array();

        foreach ($result as $month) {
            $formatted[$month['month']] = $month['value'];
        }

        return $formatted;
    }

    /**
     * Gets top selling widgets for current day
     * @return Array
     */
    public function getCurrentDayTopWidgets()
    {
        return $this->_sqlGetTopWidgets('d', $this->_currentDay);
    }

    /**
     * Gets top widgets for current week
     * @return Array
     */
    public function getCurrentWeekTopWidgets()
    {
        return $this->_sqlGetTopWidgets('w', $this->_currentWeek);
    }

    /**
     * Gets top widgets for current month
     * @return Array
     */
    public function getCurrentMonthTopWidgets()
    {
        return $this->_sqlGetTopWidgets('m', $this->_currentMonth);
    }

    /**
     * Gets top widgets for current year
     * @return Array
     */
    public function getCurrentYearTopWidgets()
    {
        return $this->_sqlGetTopWidgets('y', $this->_currentYear);
    }

    /**
     * Gets top users for current day
     * @return Array
     */
    public function getCurrentDayTopUsers()
    {
        return $this->_sqlGetRefStats('creation_user_weby', 'd', $this->_currentDay);
    }

    /**
     * Gets top users for current week
     * @return Array
     */
    public function getCurrentWeekTopUsers()
    {
        return $this->_sqlGetRefStats('creation_user_weby', 'w', $this->_currentWeek);
    }

    /**
     * Gets top users for current month
     * @return Array
     */
    public function getCurrentMonthTopUsers()
    {
        return $this->_sqlGetRefStats('creation_user_weby', 'm', $this->_currentMonth);
    }

    /**
     * Gets top users for current year
     * @return Array
     */
    public function getCurrentYearTopUsers()
    {
        return $this->_sqlGetRefStats('creation_user_weby', 'y', $this->_currentYear);
    }

    /**
     * Gets all stats for given event in form of an array
     * @param String $event Event, use class constants (Stat_Events) for easier approach
     * @return Array in which keys are periods - [d], [w], [m], [y]
     */
    public function getStatsForEvent($event)
    {
        $stats = array();
        $query = "SELECT s.value FROM {$this->db()->w_stat_period} sp
                    JOIN {$this->db()->w_stat} s ON s.period = sp.id
                    WHERE sp.year=? AND sp.type=? AND sp.value=? AND s.event=?";

        $bindValues = array(
            self::DAY => $this->_currentDay,
            self::WEEK => $this->_currentWeek,
            self::MONTH => $this->_currentMonth,
            self::YEAR => $this->_currentYear,
        );

        foreach ($bindValues as $period => $current) {
            $bind = array($this->_currentYear, $period, $current, $event);
            $stat = $this->db()->execute($query, $bind)->fetchValue();
            $stats[$period] = !$stat ? 0 : $stat;
        }

        return $stats;
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
     * SQL for getting stats for specific ref_type (eg. users_creation_of_weby), type (eg. m => month) and value (eg. 12)
     * @param $refType
     * @param $type
     * @param $value
     * @return Array|bool|\StdClass
     */
    private function _sqlGetRefStats($refType, $type, $value)
    {
        $query = "SELECT u.email, u.first_name, u.last_name, u.created_on, u.username, sr.value FROM {$this->db()->w_stat_period} sp
                    LEFT JOIN {$this->db()->w_stat_by_ref} AS sr ON sr.period = sp.id
                    LEFT JOIN {$this->db()->w_user} AS u ON u.id = sr.ref_id
                    WHERE sp.year=? AND sp.type=? AND sp.value=? AND ref_type=?
                    ORDER BY sr.value DESC LIMIT 100";

        $bind = array(
            $this->_currentYear,
            $type,
            $value,
            $refType
        );
        return $this->db()->execute($query, $bind)->fetchAll();
    }

    /**
     * SQL for updating stat record for specific ref_type, ref_id (eg. ID of user, or Weby), and increment amount
     * @param $refType
     * @param $refId
     * @param int $increment
     * @return bool
     */
    private function _sqlUpdateStatsForRef($refType, $refId, $increment = 1)
    {
        $this->_sqlGetPeriodIds();

        foreach ($this->_periodIds as $periodId) {
            $query = "SELECT update_ref_stats(?,?,?,?)";
            $bind = array(
                $periodId,
                $refType,
                $refId,
                $increment,
            );
            $this->db()->execute($query, $bind);
        }
        return true;
    }

    /**
     * SQL for getting widgets that are most used (the same ordering is applied)
     * @param $type
     * @param $value
     * @return Array|bool|\StdClass
     */
    private function _sqlGetTopWidgets($type, $value)
    {
        $query = "SELECT s.event, s.value FROM {$this->db()->w_stat_period} sp
                    LEFT JOIN {$this->db()->w_stat} s ON s.period = sp.id
                    WHERE sp.year=? AND sp.type=? AND sp.value=? AND s.event > 100
                    ORDER BY s.value DESC";

        $bind = array(
            $this->_currentYear,
            $type,
            $value
        );
        $var = $this->db()->interpolateQuery($query, $bind);
        return $this->db()->execute($query, $bind)->fetchAll();
    }

    /**
     * SQL for getting stats for specific month and event
     * @param $event
     * @return Array|bool|\StdClass
     */
    private function _sqlGetStatsByMonthForEvent($event)
    {
        $query = "SELECT sp.value AS month, s.value AS value FROM {$this->db()->w_stat_period} sp
                    JOIN {$this->db()->w_stat} s ON s.period = sp.id WHERE
                    sp.year = ? AND sp.type='m'
                    AND sp.value >= 1 AND sp.value <= 12 AND s.event=? ORDER by sp.value ASC";

        $bind = array(
            $this->_currentYear,
            $event);
        return $this->db()->execute($query, $bind)->fetchAll();
    }

    /**
     * SQL for getting stats for specific day of the year and event
     * @param $event
     * @param int $startDay
     * @param int $finishDay
     * @return Array|bool|\StdClass
     */
    private function _sqlGetStatsByDayForEvent($event, $startDay = 0, $finishDay = 365)
    {
        $query = "SELECT sp.value AS day, s.value AS value FROM {$this->db()->w_stat_period} sp
                    JOIN {$this->db()->w_stat} s ON s.period = sp.id WHERE
                    sp.year = ? AND sp.type='d'
                    AND sp.value >= ? AND sp.value <= ? AND s.event=? ORDER by sp.value ASC";
        $bind = array(
            $this->_currentYear,
            $startDay,
            $finishDay,
            $event);
        return $this->db()->execute($query, $bind)->fetchAll();
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