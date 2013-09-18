<?php

namespace App\Handlers;

use App\Entities\Weby\WebyEntity;
use App\Lib\AbstractHandler;
use App\Lib\Screenshot;
use App\Lib\Stats;
use App\Lib\UserTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Image\ImageTrait;
use Webiny\Component\Logger\LoggerTrait;
use Webiny\Component\StdLib\StdLibTrait;
use Webiny\Component\Storage\StorageTrait;
use Webiny\Component\Storage\File\LocalFile;

class ToolsHandler extends AbstractHandler
{
	use HttpTrait, LoggerTrait, UserTrait, StorageTrait, StdLibTrait, ImageTrait;

	/**
	 * Log JS exception
	 */
	public function log() {
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

	public function takeScreenshot($webyId) {
		if($this->request()->getClientIp() != '127.0.0.1' && $this->request()->getClientIp() != '192.168.249.128'){
			$this->request()->redirect($this->app()->getConfig()->app->web_path);
		}
		$weby = new WebyEntity();
		$weby->load($webyId);

		$screenshot = new Screenshot\Screenshot();
		$queue = new Screenshot\ScreenshotQueue();

		$storage = $this->storage('local');

		$key = $weby->getStorageFolder() . '/original-screenshot-' . time() . '.jpg';
		$path = $storage->getAbsolutePath($key);
		try {
			$screenshot->takeScreenshot($weby, $path);
			$weby->getImage('original-screenshot')->setKey($key)->save();

			// Create different image sizes
			$this->_createSize($weby, $storage, 90, 81, 'dashboard');
			$this->_createSize($weby, $storage, 215, 180, 'frontend-square');
			$this->_createSize($weby, $storage, 215, 512, 'frontend-vertical');
			$this->_createSize($weby, $storage, 515, 180, 'frontend-horizontal');

			$queue->complete($webyId)->processQueue();
		} catch (\Exception $e) {
			$queue->abort($webyId)->processQueue();
		}
		die();
	}

	private function _createSize($weby, $storage, $width, $height, $tag) {
		$key = $weby->getStorageFolder() . '/' . $tag . '-' . time() . '.jpg';
		$imageObj = $this->image($weby->getImage('original-screenshot')->getFile());
		$thumbImage = new LocalFile($key, $storage);
		if($imageObj->thumbnail($width, $height, 'crop')->save($thumbImage)) {
			$weby->getImage($tag)->setKey($key)->save();
		}
	}

	/**
	 * Toggle given Weby (loaded by passed id) from user's favorites list
	 */
	public function ajaxToggleFavorite($id) {
		$weby = new WebyEntity();
		if(!$weby->load($id)) {
			$this->ajaxResponse(true, 'Could not find Weby!');
		}

		// If we got a valid favorite, that means we are deleting it
		if($this->user()->inFavorites($weby)) {
			$this->user()->deleteFromFavorites($weby);
			$this->ajaxResponse(false);
		}

		// In other case, we are creating a new favorite
		$this->user()->addToFavorites($weby);
		$this->ajaxResponse(false);
	}

	/**
	 * Get user's favorite Webies
	 */
	public function ajaxGetFavorites() {
		$favorites = $this->user()->getFavoriteWebies(true);
		$data = [
			'favorites' => $this->_truncateWebyTitle(json_decode($favorites, true)),
			'count'     => WebyEntity::getTotalRows()
		];
		die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
	}

	/**
	 * Get user's Webies
	 */
	public function ajaxGetWebies() {
		$webies = $this->user()->getWebies(true);
		$data = [
			'webies' => $this->_truncateWebyTitle(json_decode($webies, true)),
			'count'  => WebyEntity::getTotalRows()
		];
		die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
	}

	/**
	 * View Weby for screnshot
	 *
	 * @param $id
	 */
	public function viewWeby($id) {
		$weby = new WebyEntity();
		$this->weby = $weby->load($id);
		$this->setTemplatePath('templates/pages')->setTemplate('screenshot');
	}

	/**
	 * Mark Weby deleted
	 *
	 * @param $webyId
	 */
	public function deleteWeby($webyId) {
		$weby = new WebyEntity();
		$weby->load($webyId);

		if($weby->getUser()->getId() != $this->user()->getId()) {
			$this->ajaxResponse(true, 'You can not delete a Weby that does not belong to you!');
		}

		$weby->delete();
		$this->ajaxResponse(false);
	}

	public function ajaxSearchTags() {
		$search = $this->request()->query('search');
		$result = WebyEntity::searchTags($search, true);
		if(!$result) {
			$result = json_encode([
								  [
									  'id'  => 0,
									  'tag' => $search
								  ]
								  ], true);
		}
		header('Content-type: application/json; charset=utf-8;');
		die($result);
	}

	// TODO: this isn't finished as some parts are still needed to complete this (image and tags)
	/**
	 * Gets Webies from given tags
	 * Also used by Wordpress Webies widget
	 */
	public function ajaxGetWebiesByTags() {
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

	private function _truncateWebyTitle($webies) {
		foreach ($webies as &$w) {
			$title = $this->str($w['title']);
			if($title->length() > 35) {
				$w['title'] = $title->truncate(32, '...')->val();
			}
		}

		return $webies;
	}

}
