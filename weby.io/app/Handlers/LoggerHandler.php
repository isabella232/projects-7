<?php

namespace App\Handlers;

use App\Lib\AbstractHandler;
use App\Lib\Logger;
use App\Lib\Stats;
use Webiny\Component\Http\HttpTrait;

class LoggerHandler extends AbstractHandler
{
    use HttpTrait;

    public function log()
    {
        $logger = new Logger();
        $errors = json_decode($this->request()->post('errors'), true);

        $browser = $this->request()->post('browser');

        foreach($errors as $e) {
            $logger->logError($e['message'], urlencode($e['url']), $e['line'], $browser);
        }

        die();
    }

}
