<?php
namespace App;

use App\Lib\DatabaseTrait;
use App\Lib\Router;
use App\Lib\Database;
use Webiny\Component\Config\ConfigObject;
use Webiny\Component\Config\ConfigTrait;
use Webiny\StdLib\SingletonTrait;
use Webiny\WebinyTrait;

class App
{
    use SingletonTrait, ConfigTrait, DatabaseTrait;

    /** @var  $_router Router */
    private $_config;

    public function init()
    {

		$this->_config = $this->config()->yaml(realpath(__DIR__) . '/config.yaml');
        $this->_config->mergeWith($this->config()->yaml(realpath(__DIR__) . '/routes.yaml'));
		
        // Init events subscribers
        AppEvents::getInstance()->subscribe();

		Router::getInstance()->route();
    }

    /**
     * @return ConfigObject
     */
    public function getConfig()
    {
        return $this->_config;
    }

    public function getDb() {
        return $this->db();
    }
}