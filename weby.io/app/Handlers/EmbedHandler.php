<?php

namespace App\Handlers;

use App\Lib\AbstractHandler;
use Webiny\Component\Http\HttpTrait;

class EmbedHandler extends AbstractHandler
{
	use HttpTrait;

	public function linkedin() {
		$this->id = $this->request()->query('id');
		$this->name = $this->request()->query('name');
	}

}

