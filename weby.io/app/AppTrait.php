<?php
namespace App;

trait AppTrait{

	/**
	 * @return App
	 */
	protected static function app(){
		return App::getInstance();
	}
}