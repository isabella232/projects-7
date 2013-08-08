<?php

namespace App\Lib;

use App\AppTrait;
use App\Lib\Minify\Minify;
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

    public function init()
    {
        $this->_config = $this->app()->getConfig()->app;
        require($this->_config->abs_path . 'Lib/Smarty/Smarty.class.php');
        $this->_smarty = new \Smarty();

        $this->_smarty->setTemplateDir($this->_config->theme_abs_path);
        $this->_smarty->setCompileDir($this->_config->public_html . 'smarty/compile/');
        $this->_smarty->setCacheDir($this->_config->public_html . 'smarty/cache/');
        $this->_smarty->setConfigDir($this->_config->abs_path . 'Lib/Smarty/smarty/configs/');
        $this->_smarty->force_compile = true;

        // Get site's configurations for use in templates (everything is packed in ViewContainer object)
        $this->_smarty->assign('viewObject', ViewContainer::getInstance());

        // Registering custom plugins for use in tpl's
        $this->_smarty->registerPlugin("modifier", "render", "\\App\\Lib\\View::renderTemplate");
        $this->_smarty->registerPlugin("function", "minify", "\\App\\Lib\\View::minify");

    }

    public function display($template = false, $data = array(), $templatePath)
    {
        if ($template == false) {
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

    public function fetch($template, $data)
    {
        return $this->_smarty->fetch($template, $data);
    }

    public static function renderTemplate($params, $template)
    {
        if (!self::str($template)->endsWith('.tpl')) {
            $template .= '.tpl';
        }

        $html = '';
        foreach ($params as $p) {
            $html .= View::getInstance()->fetch($template, ['item' => $p]);
        }

        return $html;
    }

    /**
     * Mninify function - use it to create one css or js file from multiple files
     * @param $data
     * @internal param $params :
     *    files (string) - list of files you want to minify, devided by comma (file1.css,file2.css...)
     *  type (string) - can be 'css' or 'js'
     *  path (string) - path to your css or js folder, based on relative path of current theme
     *  str    (string) - if you whish to minify a string and not a file (in this case 'files' param is ignored )
     * @return String - html tag for loading your css or js
     */
    public static function minify($data)
    {
        parse_str($data['params'], $p);

        $files = $p['files'];
        $type = $p['type'];

        $m = new Minify();

        $config = self::app()->getConfig()->app;

        if ($type == 'css') {
            $m->setCssPath($config->theme_abs_path . 'css/');
            $m->cssFolder = 'css/';
            $m->setThemeWebPath($config->theme_web_path);
            $m->minifyCSS(explode(',', $files));
        } else {
            $m->setJsPath($config->theme_abs_path . 'js/');
            $m->jsFolder = 'js/';
            $m->setThemeWebPath($config->theme_abs_path);
            $m->minifyJS(explode(',', $files));
        }

        return $m->htmlTagOutput();
    }
}
