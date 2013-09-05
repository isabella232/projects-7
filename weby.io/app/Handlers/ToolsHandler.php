<?php

namespace App\Handlers;

use App\Entities\Weby\WebyEntity;
use App\Lib\AbstractHandler;
use App\Lib\Logger;
use App\Lib\Screenshot;
use App\Lib\Stats;
use App\Lib\UserTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Logger\LoggerTrait;
use Webiny\Component\Storage\File\LocalFile;
use Webiny\Component\Storage\StorageTrait;

class ToolsHandler extends AbstractHandler
{
	use HttpTrait, LoggerTrait, UserTrait, StorageTrait;

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

	public function takeScreenshot(){
		$weby = $this->request()->query('weby');
		$screenshot = new Screenshot();
		$path = $this->storage('local')->getAbsolutePath('webies/'.$weby.'.png');
		try{
			$screenshot->takeScreenshot($weby, $path);
			$file = new LocalFile('webies/'.$weby.'.png', $this->storage('local'));
		} catch(\Exception $e){
			die(print_r($e));
		}
		die($file->getUrl());
	}

	/**
	 * Toggle Weby favorite
	 */
	public function toggleFavorite() {
		// We won't be instantianting Weby and User because we want to reduce loading and querying the database
		$webyId = $this->request()->post('wid');
		$weby = new WebyEntity();
		if(!$weby->load($webyId)) {
			$this->ajaxResponse(true, 'Could not find Weby!');
		}

		$favorite = new FavoriteEntity();
		$favorite->loadByWebyAndUser($webyId, $this->user()->getId());

		// If we got a valid favorite, that means we are deleting it
		if($favorite->getCreatedOn()) {
			$favorite->delete();
			$this->ajaxResponse(false);
		}
		// In other case, we are creating a new favorite
		$data = [
			'weby'    => $webyId,
			'user'    => $this->user()->getId(),
			'ownerId' => $weby->getUser()->getId()
		];
		$favorite->populate($data)->save();
		$this->ajaxResponse(false);
	}

	/**
	 * Get user's favorite Webies (paginated)
	 */
	public function ajaxGetFavorites() {
		$limit = $this->request()->query('\$top');
		$offset = $this->request()->query('\$skip');
	}

	public function ajaxGetWebies() {
		$webies = $this->user()->getWebies(true);
		$data = [
			'webies' => json_decode($webies),
			'count' => WebyEntity::getTotalRows()
		];
		die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
	}

	public function viewWeby($id){
		$weby = new WebyEntity();
		$this->weby = $weby->load($id);
		$this->setTemplatePath('templates/pages')->setTemplate('screenshotWeby');
	}

}
