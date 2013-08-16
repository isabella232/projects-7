<?php

namespace App\Lib;

use App\AppTrait;
use App\Lib\View;
use Webiny\Component\EventManager\EventManagerTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\OAuth2\OAuth2Loader;
use Webiny\StdLib\SingletonTrait;
use Webiny\StdLib\StdLibTrait;
use Webiny\Component\Security\SecurityTrait;

abstract class AbstractHandler
{
    use AppTrait, StdLibTrait, EventManagerTrait, SecurityTrait, HttpTrait;

    private $_dataContainer = array();
    private $_template = '';
    private $_templatePath = '';

    public function __construct()
    {
        $this->_template = Router::getInstance()->getMethod();
        $handlerTemplate = Router::getInstance()->getHandler()->explode('\\')->last()->replace('Handler', '')->caseLower();
        $this->_templatePath = 'templates/' . $handlerTemplate;

        //die(print_r($this->request()->session()->get('oauth2_user')));
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
     *
     * @param Boolean $error
     * @param String $msg  (OPTIONAL)
     * @param Array $data (OPTIONAL)
     */
    public function ajaxResponse($error, $msg = '', $data = array())
    {
        $response = array(
            'error' => $error,
            'msg' => $msg,
            'data' => $data
        );

        header('Content-type: application/json; charset=utf-8;');
        die(json_encode($response));
    }
}

