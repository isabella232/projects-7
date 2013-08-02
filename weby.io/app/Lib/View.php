<?php

namespace App\Lib;

use App\AppTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\StdLib\SingletonTrait;
use Webiny\StdLib\StdLibTrait;

class View
{
    use SingletonTrait, AppTrait, StdLibTrait, HttpTrait;

    private $_smarty;
    private $_config;
    private $_viewObject;

    public function init()
    {
        $this->_viewObject = new \stdClass();

        $this->_config = $this->app()->getConfig()->app;
        require($this->_config->abs_path . 'Lib/Smarty/Smarty.class.php');
        $this->_smarty = new \Smarty();

        $this->_smarty->setTemplateDir($this->_config->theme_path . 'theme/templates/');
        $this->_smarty->setCompileDir($this->_config->abs_path . 'Lib/Smarty/smarty/templates_c/');
        $this->_smarty->setCacheDir($this->_config->abs_path . 'Lib/Smarty/smarty/cache/');
        $this->_smarty->setConfigDir($this->_config->abs_path . 'Lib/Smarty/smarty/configs/');

        // Get site's paths
        $this->_viewObject->webPath = $this->_config->web_path;
        $this->_viewObject->absPath = $this->_config->abs_path;
        $this->_viewObject->storageAbsPath = $this->_config->storage_abs_path;
        $this->_viewObject->storageWebPath = $this->_config->storage_web_path;

        $this->_smarty->assign('viewObject', $this->_viewObject);
    }

    public function display($template = false, $data = array(), $templatePath)
    {
        if ($template == false) {
            die('No template defined.');
        } else {
            foreach ($data as $k => $v) {
                $this->_smarty->assign($k, $v);
            }

            $templatePath = $this->str($templatePath)->trimRight('controller');
            $templatePath = $this->_config->theme_path . 'theme/' . $templatePath . '/' . $template . '.tpl';
            $this->_smarty->display($templatePath);
        }

    }
}
