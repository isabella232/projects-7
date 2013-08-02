<?php
namespace App\Entities\File;

class FileEntity
{
    protected $_file;

    protected $_allowedExtensions = array();

    public function __toString()
    {
        return $this->_file['name'];
    }

    public function __construct($file)
    {
        $this->_file = $file;
        $temp = explode('.', $this->_file['name']);
        $this->_file['ext'] = strtolower(end($temp));
    }

    public function isValidFormat()
    {
        if (in_array($this->_file['ext'], $this->_allowedExtensions)) {
            return true;
        }
        return false;
    }

    public function isEmpty()
    {
        if (empty($this->_file) || $this->_file['size'] == 0 || empty($this->_file['name'])) {
            return true;
        }
        return false;
    }

    public function getName()
    {
        return $this->_file['name'];
    }

    public function getTempName()
    {
        return $this->_file['tmp_name'];
    }

}

?>

