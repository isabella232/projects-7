<?php

namespace App\Lib;

use App\AppTrait;
use Webiny\Component\Config\ConfigObject;
use Webiny\StdLib\SingletonTrait;
use Webiny\StdLib\StdLibTrait;

class Router
{
    use SingletonTrait, AppTrait, StdLibTrait;

    private $_routes = array();

    public function init()
    {
		foreach($this->app()->getConfig()->routes as $route){
			$this->_addRoute($route->get(0, ''), $route->get(1, ''), $route->get(2, ''));
		}

        $this->_routes();
    }

    public function getAll()
    {
        return $this->_routes;
    }

    private function _addRoute($urlRequest, $class, $method)
    {
        $this->_routes[$urlRequest] = array('class' => '\\App\\Controller\\' . $class, 'method' => $method);
    }

    /**
     * All routes are defined in YAML file, but they can also be defined here
     */
    private function _routes() {}
}

