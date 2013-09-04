<?php

namespace App\Handlers;

use App\AppTrait;
use App\Entities\Favorite\FavoriteEntity;
use App\Entities\Weby\WebyEntity;
use App\Lib\DatabaseTrait;
use App\Lib\AbstractHandler;
use App\Lib\Stats;
use App\Lib\UserTrait;
use App\Lib\View;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Logger\LoggerTrait;
use Webiny\Component\Security\Authentication\Providers\Http\Http;
use Webiny\Component\Security\SecurityTrait;
use Webiny\Component\StdLib\StdLibTrait;
use Webiny\Component\Storage\Directory\LocalDirectory;
use Webiny\Component\Storage\File\LocalFile;
use Webiny\Component\Storage\StorageTrait;

class EditorHandler extends AbstractHandler
{
	use AppTrait, StdLibTrait, DatabaseTrait, SecurityTrait, HttpTrait, UserTrait, StorageTrait, LoggerTrait;

	/**
	 * @var WebyEntity
	 */
	private $_weby = null;

	public function create() {
		$weby = new WebyEntity();
		$weby->setUser($this->user())->save();

		// Update stats
		$stats = Stats::getInstance();
		$stats->updateWebiesStats($this->user());

		$this->request()->redirect($weby->getEditorUrl());
	}

	public function save() {
		// Create new Weby entity, populate it and save into database
		$weby = new WebyEntity();

		// Get ID of existing Weby and load
		$id = $this->request()->post('id');
		if($id) {
			$weby->load($id);
			// TODO: check if weby belongs to this user
		}

		$weby->populate($this->request()->post());
		$weby->setUser($this->user())->save();

		$this->ajaxResponse(false, 'Weby saved!', ['time' => date('H:i:s')]);
	}

	public function route($userName, $webyId = null) {
		// If username doesn't match - redirect to correct user area
		if($userName != $this->user()->getUsername()) {
			if($this->user()->getId()) {
				$this->request()->redirect($this->user()->getProfileUrl());
			}
			$this->request()->redirect($this->app()->getConfig()->app->web_path);
		}

		// Check if weby exists
		if($webyId != null) {
			$this->_weby = new WebyEntity();
			$this->_weby->load($webyId);

			if(!$this->_weby->getId()) {
				$this->request()->redirect($this->user()->getProfileUrl());
			}

			if($this->_weby->getUser()->getId() != $this->user()->getId()) {
				$this->request()->redirect($this->user()->getProfileUrl());
			}
		}

		// Load Weby in editor
		$this->_editor();
	}

	public function uploadImage() {
		$webyId = $this->request()->query('weby');
		$this->_removeImage($webyId);
		$file = $this->request()->files('background-image');

		if(!$this->file($file->getTmpName())->isImage()) {
			$this->ajaxResponse(true, 'Given file type is not allowed!');
		}

		$ext = $this->str($file->getName())->explode('.')->last();
		$key = $this->user()->getUsername() . '/' . $webyId . '-background-' . time() . '.' . $ext;

		$webyFile = new LocalFile($key, $this->storage('local'));
		$webyFile->setContents(file_get_contents($file->getTmpName()));
		die(json_encode(['url' => $webyFile->getUrl()]));
	}

	private function _removeImage($webyId) {
		$userDir = new LocalDirectory($this->user()->getUsername(), $this->storage('local'));
		foreach ($userDir->filter($webyId . '-background*') as $file) {
			$file->delete();
		}
	}

	/**
	 * Shows Weby editor
	 */
	private function _editor() {
		if($this->_weby == null) {
			$this->setTemplate('dashboard');
			return;
		}
		$this->weby = $this->_weby;
		$validators = $this->app()->getConfig()->app->content_validators->toArray(true);
		$vIndex = rand(0, $validators->count() - 1);
		$this->contentValidator = $validators[$vIndex];
		$this->setTemplate('index');
	}
}
