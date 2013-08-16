<?php
namespace App;

use Webiny\Component\EventManager\EventManagerTrait;
use Webiny\StdLib\SingletonTrait;

class AppEvents
{
	use SingletonTrait, EventManagerTrait;

	public function subscribe(){
		$this->eventManager()->listen("wf.security.login_valid")->handler(function() {
            die('yes');
        });
	}
}