<?php

namespace App\Handlers;

use App\AppTrait;
use App\Lib\DatabaseTrait;
use App\Lib\AbstractHandler;

class TestHandler extends AbstractHandler
{
	use AppTrait, DatabaseTrait;

	public function index() {
		$query = "SELECT * FROM cars";

		$this->cars = $this->db()->execute($query)->fetchAll();
	}

}

