<?php

namespace App\Entities\Weby;


abstract class WebyEntityProperties extends WebyEntityStorage
{

    /**
     * Returns array of Widget objects
     * @return array
     */
    public function getWidgets() {
        return $this->_widgets;
    }
}