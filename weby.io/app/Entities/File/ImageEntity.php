<?php

namespace App\Entities\File;

class ImageEntity extends FileEntity
{
    protected $_allowedExtensions = array(
        'jpg', 'jpeg', 'png', 'gif'
    );

}