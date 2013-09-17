<?php
namespace App\Lib\Screenshot;

use App\AppTrait;
use App\Entities\Weby\WebyEntity;

/**
 * Class Screenshot requires XVFB and Flash plugin
 * @package App\Lib
 */

class Screenshot
{
	use AppTrait;

	private $_toolPath;
	private $_settings = [
		'--quality'          => 85,
		'--width'            => 1920,
		'--height'           => 1080,
		'--crop-x'           => 0,
		'--crop-y'           => 0,
		'--javascript-delay' => 3000,
		'--enable-plugins'   => '',
		'--use-xserver'		=> ''
	];

	public function __construct() {
		$this->_toolPath = $this->app()->getConfig()->app->abs_path . 'Lib/./wkhtmltoimage-amd64';
	}

	public function takeScreenshot(WebyEntity $weby, $path) {
		$cmd = 'xvfb-run --server-args="-screen 0, 1920x1080x24" "' . $this->_toolPath.'" ';

		$this->_settings['--crop-h'] = $weby->getSettings()['canvasHeight'];
		$this->_settings['--crop-w'] = $weby->getSettings()['canvasWidth'];

		foreach ($this->_settings as $k => $v) {
			$cmd .= $k . ' ' . $v . ' ';
		}

		$cmd .= '"'.$this->app()->getConfig()->app->web_path . 'tools/screenshot/' . $weby->getId() . '/" "' . $path.'"';

		system($cmd . ' > /dev/null 2>&1', $res);

		if($res == 0 || $res == 1) {
			return true;
		}
		throw new \Exception("Taking screenshot failed with code: " . $res);
	}

}

/*
 *
xvfb-run --server-args="-screen 0, 1920x1080x24" /var/www/newwebiny/projects/weby.io/app/Lib/./wkhtmltoimage-amd64 --quality 100 --width 1920 --height 1080 --crop-x 0 --crop-y 0 --javascript-delay 3000 --debug-javascript --crop-h 645 --crop-w 1000 --enable-plugins http://weby.com/tools/screenshot/52287594ee2cc/ /var/www/newwebiny/projects/weby.io/public_html/uploads/webies/52287594ee2cc.png

*/
