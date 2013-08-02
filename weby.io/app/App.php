<?php
namespace App;

use App\Lib\Router;
use App\Lib\Database;
use Webiny\Component\Config\ConfigObject;
use Webiny\Component\Config\ConfigTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Logger\LoggerTrait;
use Webiny\StdLib\SingletonTrait;
use Webiny\StdLib\StdLibTrait;
use Webiny\StdLib\StdObject\StdObjectWrapper;
use Webiny\WebinyTrait;

class App
{
    use SingletonTrait, ConfigTrait, HttpTrait, StdLibTrait;

    /** @var  $_router Router */
    private $_router;
    private $_class;
    private $_method;
    private $_requestParams;
    private $_db;
    private $_config;

    public function init()
    {
        $this->_config = $this->config()->yaml(realpath(__DIR__) . '/config.yaml');

        // Get database
        $this->_db = new Database();
        
        // Get routes
        $this->_router = Router::getInstance();

        // Parse request
        $this->_parseRequest();

        // Init events subscribers
        AppEvents::getInstance();

        // Run system
        $this->_run();
    }

    /**
     * @return ConfigObject
     */
    public function getConfig()
    {
        return $this->_config;
    }

    public function getMethod()
    {
        return $this->str($this->_method);
    }

    public function getController()
    {
        return $this->str($this->_class)->explode('\\')->last()->caseLower()->val();
    }

    public function getDb()
    {
        return $this->_db;
    }

    private function _run()
    {
        $controllerClass = $this->_class;
        $controllerObject = $controllerClass::getInstance();
        $controllerObject->{$this->_method}($this->_requestParams);
        $controllerObject->output();
    }

    private function _parseRequest()
    {
        // Prepare routing class
        $routes = $this->_router->getAll();

        $request = $this->str($this->request()->query('r', ''))->val();
        foreach ($routes as $regex => $route) {
            $match = false;
            $regex = $this->str($regex);

            if ($regex->equals('') && $request == '') // match empty request
            {
                $match = [true];
            } else {

                // Check this!
                $fChar = clone $regex;
                $fChar->subString(0, 1);

                if (($fChar == '|' || $fChar == '/') && ($regex->subStringCount('|') >= 2 || $regex->subStringCount('/') >= 2)
                ) {
                    // preg_match request
                    preg_match($regex->val(), $request, $match);
                } else {
                    if ($regex == $request) { // string match request
                        $match = [true];
                    }
                }
            }

            if (is_array($match) && count($match) > 0) {
                array_shift($match);
                $this->_requestParams = $match;
                $this->_class = $route['class'];
                $this->_method = $route['method'];

                return;
            }
        }
        $this->_class = '\App\\Controller\\' . $this->getConfig()->app->default_class;
        $this->_method = $this->getConfig()->app->default_method;
    }
}