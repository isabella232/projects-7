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

		// Check if this profile exists
		$headers = get_headers('http://www.linkedin.com/in/'.$this->name, 1);
		if($this->str($headers[0])->contains('200')){
			$this->profileExists = true;
		} else {
			$this->profileExists = false;
		}
	}

	public function prezi(){
		$this->preziId = $this->request()->query('preziId');
	}
}

