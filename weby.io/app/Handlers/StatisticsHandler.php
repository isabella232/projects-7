<?php

namespace App\Handlers;

use App\Lib\AbstractHandler;
use App\Lib\Stats;
use App\Lib\StatsEvents;
use App\Lib\View;
use Webiny\Component\Http\HttpTrait;

class StatisticsHandler extends AbstractHandler
{
    use HttpTrait;

    /**
     * Shows main page
     */
    public function index() {}

    /**
     * Routes stats request to specific method
     */
    public function ajax_get_stats()
    {
        $event = $this->request()->query('stat');
        $method = '_get_' . $event . '_stats';
        $this->$method();
    }

    public function ajax_get_week_stats()
    {
        $event = $this->request()->query('event');

        $days = array(0 => 'Mon', 1 => 'Tue', 2 => 'Wed', 3 => 'Thu', 4 => 'Fri', 5 => 'Sat', 6 => 'Sun');

        $ecStats = Stats::getInstance();
        $weekStats = $ecStats->getCurrentWeekStatsForEvent($event);

        $formattedWeekStats = array();
        foreach ($weekStats as $k => $v) {
            $formattedWeekStats[$days[$k]] = $v;
        }
        $this->ajaxResponse(false, 'Week', $formattedWeekStats);
    }

    public function ajax_get_month_stats()
    {
        $event = $this->request()->query('event');

        $ecStats = Stats::getInstance();
        $monthStats = $ecStats->getCurrentMonthStatsForEvent($event);
        $this->ajaxResponse(false, 'Month', $monthStats);
    }

    public function ajax_get_year_stats()
    {
        $event = $this->request()->query('event');
        $months = array(
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr', 5 => 'May', 6 => 'Jun',
            7 => 'Jul', 8 => 'Sep', 9 => 'Aug', 10 => 'Oct', 11 => 'Nov', 12 => 'Dec');
        $ecStats = Stats::getInstance();
        $yearStats = $ecStats->getCurrentYearStatsForEvent($event);
        $formatted = array();
        foreach ($yearStats as $k => $v) {
            $formatted[$months[$k]] = $v;
        }

        $this->ajaxResponse(false, 'Year', $formatted);
    }

    public function ajax_get_widget_usage_stats()
    {
        $period = $this->request()->query('period');
        $wStats = Stats::getInstance();

        $view = View::getInstance();

        $statistics['title'] = 'Widgets by usage';

        switch ($period) {
            case 'today':
                $statistics['widgets'] = $wStats->getCurrentDayTopWidgets();
                break;
            case 'week':
                $statistics['widgets'] = $wStats->getCurrentWeekTopWidgets();
                break;
            case 'month':
                $statistics['widgets'] = $wStats->getCurrentMonthTopWidgets();
                break;
            case 'year':
                $statistics['widgets'] = $wStats->getCurrentYearTopWidgets();
                break;
        }

        foreach ($statistics['widgets'] as $w) {
            $w['widgetName'] = StatsEvents::getToolName($w['event']);
        }

        if($statistics['widgets']->count()) {
            $this->ajaxResponse(false, '', [$view->fetch('templates/statistics/includes/usage_widgets.tpl', $statistics)]);
        }
        $this->ajaxResponse(true, '', [$view->fetch('templates/statistics/includes/no_data.tpl', $statistics)]);

    }

    public function ajax_get_top_user_stats()
    {

        $period = $this->request()->query('period');
        $wStats = Stats::getInstance();
        $view = View::getInstance();

        $statistics['title'] = 'Widgets by usage';

        switch ($period) {
            case 'today':
                $statistics['users'] = $wStats->getCurrentDayTopUsers();
                break;
            case 'week':
                $statistics['users'] = $wStats->getCurrentWeekTopUsers();
                break;
            case 'month':
                $statistics['users'] = $wStats->getCurrentMonthTopUsers();
                break;
            case 'year':
                $statistics['users'] = $wStats->getCurrentYearTopUsers();
                break;
        }

        if($statistics['users']->count()) {
            $this->ajaxResponse(false, '', [$view->fetch('templates/statistics/includes/top_users.tpl', $statistics)]);
        }
        $this->ajaxResponse(true, '', [$view->fetch('templates/statistics/includes/no_data.tpl', $statistics)]);

    }

    public function ajax_get_top_webies_stats()
    {
        $period = $this->request()->query('period');
        $wStats = Stats::getInstance();
        $view = View::getInstance();

        $statistics['title'] = 'Widgets by usage';

        switch ($period) {
            case 'today':
                $statistics['webies'] = $wStats->getCurrentDayTopWebies();
                break;
            case 'week':
                $statistics['webies'] = $wStats->getCurrentWeekTopWebies();
                break;
            case 'month':
                $statistics['webies'] = $wStats->getCurrentMonthTopWebies();
                break;
            case 'year':
                $statistics['webies'] = $wStats->getCurrentYearTopWebies();
                break;
        }

        $statistics['webPath'] = $this->app()->getConfig()->app->web_path;
        if($statistics['webies']->count()) {
            $this->ajaxResponse(false, '', [$view->fetch('templates/statistics/includes/top_webies.tpl', $statistics)]);
        }
        $this->ajaxResponse(true, '', [$view->fetch('templates/statistics/includes/no_data.tpl', $statistics)]);

    }

    private function _get_widget_usage_stats()
    {
        $view = View::getInstance();
        $data['title'] = 'Widgets by usage';
        $data['stat'] = 'widget_usage';
        $this->ajaxResponse(false, '', [$view->fetch('templates/statistics/includes/period_selector.tpl', $data)]);
    }

    private function _get_top_user_stats()
    {
        $view = View::getInstance();
        $data['title'] = 'Top users';
        $data['stat'] = 'top_user';
        $this->ajaxResponse(false, '', [$view->fetch('templates/statistics/includes/period_selector.tpl', $data)]);
    }

    private function _get_top_webies_stats()
    {
        $view = View::getInstance();
        $data['title'] = 'Top Webies';
        $data['stat'] = 'top_webies';
        $this->ajaxResponse(false, '', [$view->fetch('templates/statistics/includes/period_selector.tpl', $data)]);
    }

    private function _get_registered_users_stats()
    {
        $this->_getStandardDataView(StatsEvents::USER_REGISTERED, 'Users registered');
    }

    private function _get_created_webies_stats()
    {
        $this->_getStandardDataView(StatsEvents::WEBY_CREATED, 'Webies created');
    }

    private function _get_widget_general_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_ADDED, 'Widgets: General');
    }

    private function _get_widget_text_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_TEXT_ADDED, 'Widgets: Text added');
    }

    private function _get_widget_link_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_LINK_ADDED, 'Widgets: Link added');
    }

    private function _get_widget_video_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_VIDEO_ADDED, 'Widgets: Video added');
    }

    private function _get_widget_map_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_MAP_ADDED, 'Widgets: Google map added');
    }

    private function _get_widget_instagram_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_INSTAGRAM_ADDED, 'Widgets: Instagram added');
    }

    private function _get_widget_pinterest_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_PINTEREST_ADDED, 'Widgets: Pinterest added');
    }

    private function _get_widget_facebook_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_FACEBOOK_ADDED, 'Widgets: Facebook added');
    }

    private function _get_widget_prezi_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_PREZI_ADDED, 'Widgets: Prezi added');
    }

    private function _get_widget_slideshare_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_SLIDESHARE_ADDED, 'Widgets: Slideshare added');
    }

    private function _get_widget_googledrive_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_GOOGLEDRIVE_ADDED, 'Widgets: Google drive added');
    }

    private function _get_widget_skydrive_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_SKYDRIVE_ADDED, 'Widgets: Sky drive added');
    }

    private function _get_widget_soundcloud_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_SOUNDCLOUD_ADDED, 'Widgets: Soundcloud added');
    }

    private function _get_widget_linkedin_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_LINKEDIN_ADDED, 'Widgets: Linked In added');
    }

    private function _get_widget_tweet_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_TWEET_ADDED, 'Widgets: Twitter added');
    }

    private function _get_widget_vine_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_VINE_ADDED, 'Widgets: Vine added');
    }

    private function _get_widget_flickr_stats()
    {
        $this->_getStandardDataView(StatsEvents::$W_FLICKR_ADDED, 'Widgets: Flickr added');
    }

    private function _get_oauth_facebook_stats()
    {
        $this->_getStandardDataView(StatsEvents::OAUTH_REG_BY_FACEBOOK, 'OAuth: Registered with Facebook');
    }

    private function _get_oauth_google_stats()
    {
        $this->_getStandardDataView(StatsEvents::OAUTH_REG_BY_GOOGLE, 'OAuth: Registered with Google');
    }

    private function _get_oauth_linkedin_stats()
    {
        $this->_getStandardDataView(StatsEvents::OAUTH_REG_BY_LINKEDIN, 'OAuth: Registered with Linked In');
    }

    private function _getStandardDataView($event, $title)
    {
        $view = View::getInstance();

        $wStats = Stats::getInstance();
        $statistics = $wStats->getStatsForEvent($event);
        $statistics['overallStats'] = $wStats->getOverallStatsForEvent($event);
        $statistics['title'] = $title;
        $statistics['event'] = $event;
        $statistics['dayOfWeek'] = date('N');
        $statistics['dayOfMonth'] = date('j');
        $statistics['monthOfYear'] = date('m');

        $this->ajaxResponse(false, '', $view->fetch('templates/statistics/includes/standard_data_presentation.tpl', $statistics));
    }

}