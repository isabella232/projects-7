<?php

namespace App\Handlers;

use App\AppTrait;
use App\Lib\DatabaseTrait;
use App\Lib\AbstractHandler;

class EditorHandler extends AbstractHandler
{
	use AppTrait, DatabaseTrait;

	public function index() {
		$validators = $this->app()->getConfig()->app->content_validators->toArray(true);
		$vIndex = rand(0, $validators->count() - 1);
		$this->contentValidator = $validators[$vIndex];
	}
}

