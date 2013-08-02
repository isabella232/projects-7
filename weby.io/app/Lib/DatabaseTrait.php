<?php
namespace App\Lib;


trait DatabaseTrait {

	/**
	 * Get database instance
	 * @return Database
	 */
	protected static function db(){
		return Database::getInstance();
	}

}