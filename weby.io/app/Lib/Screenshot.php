<?php
namespace App\Lib;


use App\AppTrait;

class Screenshot
{
	use AppTrait;

	private $_toolPath;
	private $_settings = [
		'--quality'          => 100,
		'--javascript-delay' => 3000,
		'--width'            => 1920,
		'--height'           => 1080,
		/*'--crop-x'           => 100,
		'--crop-y'           => 60,
		'--crop-h'           => 150,
		'--crop-w'           => 180,
		'--zoom'             => 0.4,*/
		'--debug-javascript' => ''
	];

	public function __construct() {
		$this->_toolPath = $this->app()->getConfig()->app->abs_path . 'Lib/./wkhtmltoimage-amd64 ';
	}

	public function takeScreenshot($weby, $path) {
		$cmd = $this->_toolPath;
		foreach ($this->_settings as $k => $v) {
			$cmd .= $k . ' ' . $v . ' ';
		}

		$cmd .= $this->app()->getConfig()->app->web_path . 'tools/screenshot/' . $weby . '/ ' . $path;
		die($cmd);
		system($cmd . " > /dev/null 2>&1", $res);
		if($res == 0) {
			return true;
		}
		throw new \Exception("Taking screenshot failed with code: " . $res);
	}

}