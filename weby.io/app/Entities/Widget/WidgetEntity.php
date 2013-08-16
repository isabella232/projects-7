<?php

namespace App\Entities\Widget;

class WidgetEntity
{

    private $_data;

    /**
     * We load all data into property in form of an array
     * @param $data
     */
    public function __construct($data)
    {
        // If data is not in form of an array, then decode it
        $this->_data = is_array($data) ? $data : json_decode($data, true);
    }

    /**
     * Gets widget type
     * @return bool
     */
    public function getType()
    {
        return $this->_getProperty('type');
    }

    /**
     * Gets property of a widget, if you don't specify a group, common is used
     * @param $key
     * @param string $group
     * @return bool
     */
    private function _getProperty($key, $group = 'common')
    {
        return isset($this->_data[$group][$key]) ? $this->_data[$group][$key] : false;
    }
}