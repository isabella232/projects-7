<?php
use App\App;

// Display errors in browser or not (will be used for system debugger)
ini_set('display_errors', true);

// Error reporting level - set to ALL to ensure high coding quality ;)
error_reporting(E_ALL);

require_once(realpath(__DIR__) . '/../library/autoloader.php');
App::getInstance();




