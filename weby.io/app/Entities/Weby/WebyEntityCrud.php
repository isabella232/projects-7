<?php

namespace App\Entities\Weby;

use App\Entities\Widget\WidgetEntity;
use Webiny\Component\StdLib\StdLibTrait;
use Webiny\Component\Storage\File\LocalFile;
use Webiny\Component\Storage\StorageTrait;

abstract class WebyEntityCrud extends WebyEntityProperties
{
	use StdLibTrait, StorageTrait;

	private $_createStorageFolder = false;

	protected function _onAfterLoad() {
		if($this->_settings == null) {
			$this->_settings = [];
		} else {
			$this->_settings = json_decode($this->_settings, true);
		}

		$this->_content = $this->_content;
		if($this->_content == null) {
			$this->_content = [];
		} else {
			$this->_content = json_decode($this->_content, true);
		}
	}

	protected function _onBeforeSave() {
		if(empty($this->_id)) {
			$this->_createStorageFolder = true;
		}
		$this->_slug = $this->_toSlug($this->_title);
	}

	protected function _onAfterSave() {
		if($this->_createStorageFolder){
			$this->_createStorageFolder = false;
			// Store a temp file just to create a weby storage folder and store
			$storage = $this->storage('webies');
			$file = new LocalFile($this->_id.'/weby.tmp', $storage);
			$file->setContents('');
			$file->delete();
			$this->_storage = $this->str($file->getKey())->replace('/weby.tmp', '');
			$this->_sqlSetStorage();
		}
	}
}