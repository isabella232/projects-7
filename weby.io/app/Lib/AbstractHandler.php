<?php

namespace App\Lib;

use App\AppTrait;
use App\Entities\User\ServiceType;
use App\Entities\User\UserEntity;
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
    private $_loggedUser = null;

    public function __construct()
    {
        $this->_template = Router::getInstance()->getMethod();
        $handlerTemplate = Router::getInstance()->getHandler()->explode('\\')->last()->replace('Handler', '')->caseLower();
        $this->_templatePath = 'templates/' . $handlerTemplate;
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

    /**
     * Returns true user from Weby's users database
     * @return UserEntity|null
     */
    public function getLoggedUser()
    {
        if (is_null($this->_loggedUser)) {
            $this->_loggedUser = new UserEntity();

            // We pickup data from session which is assigned on sign in
            $userData = $this->request()->session('oauth_user')->get('oauth2_user');

            // Then load the user by service type and his email that was registered there
            // TODO: getServiceFromLink() parses a link to get service type, maybe it could be done smarter
            // TODO: is email unique identifier? We also have a profile ID, but Google's ID is to big for bigint (char?)
            $this->_loggedUser->loadByService($this->getServiceFromLink($userData->profileUrl), $userData->email);
        }
        return $this->_loggedUser;
    }

    /**
     * Returns service name based on given URL
     * @param \StringObject $serviceUrl      URL to check
     * @return String                       Name of service
     */
    protected function getServiceFromLink($serviceUrl)
    {
        if (!$serviceUrl instanceof StringObject) {
            $serviceUrl = $this->str($serviceUrl);
        }

        if ($serviceUrl->contains('facebook')) {
            return ServiceType::FACEBOOK;
        }
        if ($serviceUrl->contains('google')) {
            return ServiceType::GOOGLE;
        }
        if ($serviceUrl->contains('linkedin')) {
            return ServiceType::LINKEDIN;
        }
    }
}

