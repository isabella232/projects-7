<?php
namespace App;

use Webiny\Component\EventManager\EventManagerTrait;
use Webiny\StdLib\SingletonTrait;

class AppEvents
{
	use SingletonTrait, EventManagerTrait;

	public function init() {
        //$this->eventManager()->listen("wf.storage.file_saved")->handler("")->method("fileSaved");
	}

}