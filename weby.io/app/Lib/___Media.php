<?php

namespace App;

class Media
{
    use Singleton_Trait;

    private $_crypt;
    private $_user;
    private $_usersUploadFolder;

    public function init() {
        // TODO: get user object from App object
        $this->_user = 'adrian';
        $this->_crypt = Crypt::getInstance();
        $this->_usersUploadFolder = UPLOAD_ABS_PATH . $this->_crypt->encrypt($this->_user) . '/';
    }

    /**
     * Moves the uploaded file to the given destination
     * @param \App\File|\App\Objects\File\File $file
     * @return bool
     */
    public function uploadFile(Objects\File\File $file)
    {
        // TODO: select users upload folder based on username

        $filename = $this->_crypt->encrypt($file->getName());
    
        if (!is_dir($this->_usersUploadFolder)) {
            mkdir($this->_usersUploadFolder, 0775);
        }

        if (move_uploaded_file($file->getTempName(), $this->_usersUploadFolder . $filename)) {
            return true;
        }

        return false;
    }

}