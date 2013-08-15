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

	public function vine(){
		$this->vineId = $this->request()->query('vineId');
	}

	public function pinterest(){
		$this->pinUrl = $this->request()->query('pinUrl');
		$this->pinType = $this->request()->query('pinType');

		if(!$this->pinUrl || !$this->pinType){
			$this->pinUrl = 'http://pinterest.com/pin/99360735500167749/';
			$this->pinType = 'pin';
		}
	}
}

