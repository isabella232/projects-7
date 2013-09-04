<?php

namespace App\Handlers;

use App\Lib\AbstractHandler;
use App\Lib\Logger;
use App\Lib\Stats;
use App\Lib\UserTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Logger\LoggerTrait;

class ToolsHandler extends AbstractHandler
{
	use HttpTrait, LoggerTrait, UserTrait;

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
		$page = $this->request()->query('page');
	}

	public function ajaxGetWebies() {
		$webies = $this->user()->getWebies(true);
		$data = [
			'webies' => json_decode($webies),
			'count' => 12
		];
		die($this->request()->query("\$callback") . '(' . json_encode($data) . ')');
	}

}
