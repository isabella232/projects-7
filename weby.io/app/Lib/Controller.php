<?php

namespace App\Lib;

use App\App;
use App\AppTrait;
use App\Lib\View;
use Webiny\StdLib\SingletonTrait;
use Webiny\StdLib\StdLibTrait;

class Controller
{
    use SingletonTrait, AppTrait, StdLibTrait;

    private $_dataContainer = array();
    private $_template = '';
    private $_templatePath = '';
    private $_db = '';

    public function init()
    {
        $this->_template = App::getInstance()->getMethod();
        $this->_templatePath = 'templates' . DIRECTORY_SEPARATOR . App::getInstance()->getController();
        $this->_db = App::getInstance()->getDb();
    }

    public function output()
    {
        View::getInstance()->display($this->_template, $this->_dataContainer, $this->_templatePath);
    }

    public function setTemplatePath($dir)
    {
        $this->_templatePath = removeTrailingSlash($dir) . '/';
    }

    public function setTemplate($template)
    {
        $this->_template = $template;
    }

    public function __set($name, $value)
    {
        $this->_dataContainer[$name] = $value;
    }

    public function __get($name)
    {
        if (isset($this->_dataContainer[$name])) {
            return $this->_dataContainer[$name];
        }
        return null;
    }

    public function redirect301($url)
    {
        Header("HTTP/1.1 301 Moved Permanently");
        Header("Location: " . removeTrailingSlash($url) . '/');
        die();
    }

    public function redirect404($url)
    {
        Header("HTTP/1.1 404 Not Found");
        Header("Location: " . removeTrailingSlash($url) . '/');
        die();
    }

    public function redirect($url)
    {
        header("LOCATION: " . $url);
        die();
    }

    /**
     * Ajax response
     * @param Boolean $error
     * @param String $msg (OPTIONAL)
     * @param Array $data (OPTIONAL)
     */
    public function ajaxResponse($error, $msg = '', $data = array())
    {
        $response = array(
            'error' => $error,
            'msg' => $msg,
            'data' => $data
        );

        jsonResponse($response);
    }

    public function getRequest($param, $default = false)
    {
        return App::getInstance()->getRequest($param, $default);
    }

    /**
     * @return Database
     */
    protected function _getDb()
    {
        return $this->_db;
    }
}

