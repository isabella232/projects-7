<?php

namespace App\Handlers;

use App\AppTrait;
use App\Entities\User\UserEntity;
use App\Entities\Weby\WebyEntity;
use App\Lib\AbstractHandler;
use App\Lib\Screenshot\Photographer;
use App\Lib\Stats\Stats;
use App\Lib\Traits\HelperTrait;
use App\Lib\Traits\UserTrait;
use App\Lib\View;
use Webiny\Component\Cache\CacheTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Image\ImageTrait;
use Webiny\Component\Logger\LoggerTrait;
use Webiny\Component\StdLib\StdLibTrait;
use Webiny\Component\Storage\StorageTrait;
use Webiny\Component\Storage\File\LocalFile;
use App\Lib\Logger as WebyLogger;

class ToolsHandler extends AbstractHandler
{
    use HttpTrait, LoggerTrait, UserTrait, StorageTrait, StdLibTrait, ImageTrait, AppTrait, CacheTrait, HelperTrait;

    /**
     * Log JS exception
     */
    public function log()
    {
        $errors = json_decode($this->request()->post('errors'), true);
        $browser = $this->request()->post('browser');
        foreach ($errors as $e) {
            $this->logger('webiny_logger')
                ->warning($e['message'], [
                    urlencode($e['url']),
                    $e['line'],
                    $browser
                ]);
            WebyLogger::getInstance()->logError($e['message'], $e['url'], $e['line'], $browser);
        }

        $this->ajaxResponse(false, 'Got it :)');
    }

    public function takeScreenshot($webyId)
    {

        // Check if screenshooting is enabled and the IP is allowed to make this request

        if (!$this->app()->getConfig()->screenshots->enabled) {
            $this->request()->redirect($this->app()->getConfig()->app->web_path);
        }

        $ips = $this->app()->getConfig()->screenshots->ip->toArray(true);

        if (!$ips->inArray($this->request()->getClientIp())) {
            $this->request()->redirect($this->app()->getConfig()->app->web_path);
        }

        // Load Weby and take screenshots
        $weby = new WebyEntity();
        $weby->load($webyId);

        // Make Weby images
        $storage = $this->storage('local');
        $photographer = new Photographer($weby, $storage);
        if ($photographer->takeScreenshots()) {
            $this->helper()->flushWebyCache($weby);
        }
        die();
    }

    public function webySummary($webyId)
    {
        $weby = new WebyEntity();
        $weby->load($webyId);
		$this->helper()->logUserAction($this->user(), 'Viewing <strong><a href="'.$weby->getPublicUrl().'" target="blank">' . $weby->getTitle() . '</a></strong>');
        Stats::getInstance()->updateWebyHits($weby);
        die($weby->getSummaryData());
    }

    /**
     * Sends general feedback to email (addresses are in config.yaml)
     */
    public function ajaxSendFeedback()
    {
        $data = [];
        $data['name'] = $this->user() ? $this->user()->getFirstName() . ' ' . $this->user()->getLastName() : $this->request('name');
        $data['email'] = $this->user() ? $this->user()->getEmail() : $this->request('email');
        $data['message'] = $this->request()->post('message');

        $config = $this->app()->getConfig();
        $absPath = $config->app->theme_abs_path;
        $feedbackReceivers = $config->feedback_receivers->get('general')->toArray();
        // Send feedback by email
        $mailer = $this->mailer();

        $mailData = [];
        foreach ($feedbackReceivers as $receiver) {
            $mailData[$receiver] = [
                '{name}' => $data['name'],
                '{email}' => $data['email'],
                '{message}' => $data['message']
            ];
        }
        // Let's build our message
        $msg = $mailer->getMessage();
        $msg->setSubject('Weby.io - User feedback')
            ->setBodyFromTemplate($absPath . 'templates/emails/feedback.tpl')
            ->setContentType('text/html')
            ->setTo($feedbackReceivers);

        // Send it
        $mailer->setDecorators($mailData);
        $mailer->send($msg);

		$this->helper()->logUserAction($this->user(), 'Just sent some feedback!');

        $this->ajaxResponse(false);
    }

    /**
     * Get user's favorite Webies
     */
    public function ajaxGetFavorites()
    {
        if (!$this->user()) {
            $data = [
                'user' => false
            ];
        } else {
            $favorites = $this->user()->getFavoriteWebies(true);
            $data = [
                'favorites' => $this->_truncateWebyTitle(json_decode($favorites, true)),
                'count' => UserEntity::getTotalRows(),
                'user' => true
            ];
        }
        die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
    }

    /**
     * Get user's Webies
     */
    public function ajaxGetWebies()
    {
        if (!$this->user()) {
            $data = [
                'user' => false
            ];
        } else {
            $webies = $this->user()->getWebies(true);
            $data = [
                'webies' => $this->_truncateWebyTitle(json_decode($webies, true)),
                'count' => WebyEntity::getTotalRows(),
                'user' => true
            ];
        }
        die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
    }

    /**
     * Get user's followers
     */
    public function ajaxGetFollowers()
    {
        $followers = $this->user()->getFollowers(true);
        $data = [
            'followers' => json_decode($followers, true),
            'count' => $this->user()->getUsersFollowingCount()
        ];
        die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
    }

    /**
     * Used to update number of hits of a given Weby
     */
    public function ajaxEmbeddedHit($id)
    {
        // Firstly, check if we got valid referer
        $referer = $this->request()->server()->httpReferer();
        $referer = $referer ? $this->str($referer) : false;
        if (!$referer || !$referer->startsWith($this->app()->getConfig()->app->web_path)) {
            die();
        }

        // If everything went okay, then check if we got valid Weby
        $weby = new WebyEntity();
        if (!$weby->load($id)) {
            $this->ajaxResponse(true, 'Could not find Weby!');
        }

        // Finally, update hit stats
        Stats::getInstance()->updateWebyEmbeddedHits($weby);
        die();
    }

    /**
     * View Weby for screnshot
     * @param $id
     */
    public function viewWeby($id)
    {
        $weby = new WebyEntity();
        $this->weby = $weby->load($id);
        $this->setTemplatePath('templates/pages')->setTemplate('screenshot');
    }

    /**
     * Mark Weby deleted
     * @param $webyId
     */
    public function deleteWeby($webyId)
    {
        $data = ['user' => true];

        if (!$this->user()) {
            $data = ['user' => false];
        } else {
            $weby = new WebyEntity();
            $weby->load($webyId);

            if ($weby->getUser()->getId() == $this->user()->getId()) {
                $weby->delete();
            }
        }

        header('Content-type: application/json; charset=utf-8;');
        die(json_encode($data));
    }

    /**
     * This searches tags when typing them in in tags textbox (eg. in editor - Weby dialog - title, tags, description)
     */
    public function ajaxSearchTags()
    {
        $search = $this->request()->post('search');
        $this->helper()->sanitizeInput($search, true);
        $result = WebyEntity::searchTags($search, true, true);
        header('Content-type: application/json; charset=utf-8;');
        die($result);
    }

    // TODO: add TAGs to resultset
    /**
     * Gets Webies from given tags
     * Also used by Wordpress Webies widget
     */
    public function ajaxGetWebiesByTags()
    {
        $tags = $this->request()->query('q');
        $webiesIds = WebyEntity::listWebiesByTag($tags);
        $json = [];
        $weby = new WebyEntity();
        foreach ($webiesIds as $id) {
            $weby->load($id);
            $temp['id'] = $weby->getId();
            $temp['title'] = $weby->getTitle();
            $temp['thumbnail'] = $weby->getImage('dashboard')->getUrl();
            $temp['author'] = $weby->getUser()->getFirstName() . ' ' . $weby->getUser()->getLastName();
            $temp['hits'] = $weby->getTotalHits();
            $temp['favorites'] = $weby->getFavoriteCount();
            $temp['url'] = $weby->getPublicUrl();
            $json[] = $temp;
        }

        header('Content-type: application/json; charset=utf-8;');
        die("showWebies(" . json_encode($json) . ");");
    }

    private function _truncateWebyTitle($webies)
    {
        foreach ($webies as &$w) {
            $title = $this->str($w['title']);
            if ($title->length() > 35) {
                $w['title'] = $title->truncate(32, '...')->val();
            }
        }

        return $webies;
    }
}
