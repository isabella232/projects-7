<?php

namespace App\Controller;

use App\AppTrait;
use App\Lib\Controller;
use Webiny\Component\Storage\Storage;
use Webiny\Component\Storage\Driver\Local\Local;
use Webiny\Component\Storage\File\LocalFile;
use Webiny\Component\Storage\Directory\Directory;

class FilesController extends Controller
{
    use AppTrait;

    public function upload()
    {
        $driver = new Local(
            $this->app()->getConfig()->app->storage_abs_path,
            $this->app()->getConfig()->app->storage_web_path,
            true, true);

        $storage = new Storage($driver);

        $file = new LocalFile('superfile', $storage);
        $content = file_get_contents('http://www.w3schools.com/images/w3schoolslogoNEW310113.gif');
        $file->setContent($content);

        echo $file->getAbsolutePath();
        echo "<br /> URL: ";
        echo $file->getUrl();
        echo "<br /> Size: ";
        echo $file->getSize();
        echo "<br /> Time modified: ";
        echo $file->getTimeModified(true);
        echo "<br />Key: ";
        echo $file->getKey();

        die(print_r('gotovo'));
    }

}

