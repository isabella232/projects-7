<?php

namespace App\Lib;

use App\AppTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\StdLib\SingletonTrait;
use Webiny\StdLib\StdLibTrait;

class View
{
	use SingletonTrait, AppTrait, StdLibTrait, HttpTrait;

	/**
	 * @var \Smarty
	 */
	private $_smarty;
	private $_config;
	private $_viewObject;

	public function init() {
		$this->_viewObject = new \stdClass();

		$this->_config = $this->app()->getConfig()->app;
		require($this->_config->abs_path . 'Lib/Smarty/Smarty.class.php');
		$this->_smarty = new \Smarty();

		$this->_smarty->setTemplateDir($this->_config->theme_abs_path);
		$this->_smarty->setCompileDir($this->_config->public_html . 'smarty/compile/');
		$this->_smarty->setCacheDir($this->_config->public_html . 'smarty/cache/');
		$this->_smarty->setConfigDir($this->_config->abs_path . 'Lib/Smarty/smarty/configs/');
		$this->_smarty->force_compile = true;

		// Get site's paths
		$this->_viewObject->webPath = $this->_config->web_path;
		$this->_viewObject->absPath = $this->_config->abs_path;
		$this->_viewObject->themeAbsPath = $this->_config->theme_abs_path;
		$this->_viewObject->themeWebPath = $this->_config->theme_web_path;
		$this->_viewObject->storageAbsPath = $this->_config->storage_abs_path;
		$this->_viewObject->storageWebPath = $this->_config->storage_web_path;

		$this->_smarty->assign('viewObject', $this->_viewObject);

		$this->_smarty->registerPlugin("modifier", "render", "\\App\\Lib\\View::renderTemplate");
	}

	public function display($template = false, $data = array(), $templatePath) {
		if($template == false) {
			die('No template defined.');
		} else {
			foreach ($data as $k => $v) {
				$this->_smarty->assign($k, $v);
			}

			$templatePath = $this->str($templatePath)->replace('controller', '');
			$templatePath = $this->_config->theme_abs_path . $templatePath . '/' . $template . '.tpl';
			$this->_smarty->display($templatePath);
		}

	}

	public function fetch($template, $data) {
		return $this->_smarty->fetch($template, $data);
	}

	public static function renderTemplate($params, $template) {
		if(!self::str($template)->endsWith('.tpl')) {
			$template .= '.tpl';
		}

		$html = '';
		foreach ($params as $p) {
			$html .= View::getInstance()->fetch($template, ['item' => $p]);
		}

		return $html;
	}
}
