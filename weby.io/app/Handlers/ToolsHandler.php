<?php

namespace App\Handlers;

use App\Entities\Favorite\FavoriteEntity;
use App\Entities\Weby\WebyEntity;
use App\Lib\AbstractHandler;
use App\Lib\Screenshot;
use App\Lib\Stats;
use App\Lib\UserTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Logger\LoggerTrait;
use Webiny\Component\StdLib\StdLibTrait;
use Webiny\Component\Storage\StorageTrait;

class ToolsHandler extends AbstractHandler
{
    use HttpTrait, LoggerTrait, UserTrait, StorageTrait, StdLibTrait;

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
        }
        $this->ajaxResponse(false, 'Got it :)');
    }

    public function takeScreenshot($webyId)
    {
        $weby = new WebyEntity();
        $weby->load($webyId);

        $screenshot = new Screenshot\Screenshot();
        $queue = new Screenshot\ScreenshotQueue();

        $key = $weby->getStorageFolder() . '/original-screenshot-' . time() . '.png';
        $path = $this->storage('local')->getAbsolutePath($key);
        try {
            $screenshot->takeScreenshot($weby, $path);
            $weby->getImage('original-screenshot')->setKey($key)->save();
            $queue->complete($webyId)->processQueue();
        } catch (\Exception $e) {
            $queue->abort($webyId)->processQueue();
        }
        die();
    }

    /**
     * Toggle Weby favorite
     */
    public function ajaxToggleFavorite($id)
    {
        $weby = new WebyEntity();
        if (!$weby->load($id)) {
            $this->ajaxResponse(true, 'Could not find Weby!');
        }

        $favorite = new FavoriteEntity();
        $favorite->loadByWebyAndUser($id, $this->user()->getId());

        // If we got a valid favorite, that means we are deleting it
        if ($favorite->getCreatedOn()) {
            $favorite->delete();
            $this->ajaxResponse(false);
        }
        // In other case, we are creating a new favorite
        $data = [
            'weby' => $id,
            'user' => $this->user()->getId(),
            'ownerId' => $weby->getUser()->getId()
        ];
        $favorite->populate($data)->save();
        $this->ajaxResponse(false);
    }

    /**
     * Get user's favorite Webies
     */
    public function ajaxGetFavorites()
    {
        $favorites = $this->user()->getFavoriteWebies(true);
        $data = [
            'favorites' => $this->_truncateWebyTitle(json_decode($favorites, true)),
            'count' => WebyEntity::getTotalRows()
        ];
        die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
    }

    /**
     * Get user's Webies
     */
    public function ajaxGetWebies()
    {
        $webies = $this->user()->getWebies(true);
        $data = [
            'webies' => $this->_truncateWebyTitle(json_decode($webies, true)),
            'count' => WebyEntity::getTotalRows()
        ];
        die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
    }

    /**
     * View Weby for screnshot
     * @param $id
     */
    public function viewWeby($id)
    {
        $weby = new WebyEntity();
        $this->weby = $weby->load($id);
        $this->setTemplatePath('templates/pages')->setTemplate('screenshotWeby');
    }

    /**
     * Mark Weby deleted
     * @param $webyId
     */
    public function deleteWeby($webyId)
    {
        $weby = new WebyEntity();
        $weby->load($webyId);

        if ($weby->getUser()->getId() != $this->user()->getId()) {
            $this->ajaxResponse(true, 'You can not delete a Weby that does not belong to you!');
        }

        $weby->delete();
        $this->ajaxResponse(false);
    }

    // TODO: this isn't finished as some parts are still needed to complete this
    /**
     * Gets Webies from given tags
     * Also used by Wordpress Webies widget
     */
    public function ajaxGetWebiesByTags()
    {
        $tags = $this->request()->query('q');
        $webiesIds = WebyEntity::getWebiesByTags($tags);
        $json = [];
        $weby = new WebyEntity();
        foreach ($webiesIds as $id) {
            $weby->load($id);
            $temp['id'] = $weby->getId();
            $temp['title'] = $weby->getTitle();
            $temp['thumbnail'] = 'http://www.hdwallpaperstop.com/wp-content/uploads/2013/02/Cute-Puppy-Black-Eyes-Wallpaper.jpg';
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
