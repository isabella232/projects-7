<?php

namespace App\Handlers;

use App\AppTrait;
use App\Lib\DatabaseTrait;
use App\Lib\AbstractHandler;

class TestHandler extends AbstractHandler
{
	use AppTrait, DatabaseTrait;

	public function index() {

		$url = 'https://docs.google.com/spreadsheet/pub?key=0AjdjFGIeoFTCdDdKN1gtYVROUllhY3BZYms2ZTBocUE';
		#$url = 'http://mrcina.ath.cx/weby.io/editor';

		die(print_r(get_headers($url)));


		$query = "SELECT * FROM cars";

		$this->cars = $this->db()->execute($query)->fetchAll();
	}

}

