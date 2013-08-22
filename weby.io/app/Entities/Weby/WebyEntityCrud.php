<?php

namespace App\Entities\Weby;

use App\Entities\Widget\WidgetEntity;

abstract class WebyEntityCrud extends WebyEntityProperties
{
    /**
     * This converts all widgets into objects (using for Stats class)
     * @param $data
     * @return bool|void
     */
    protected function _onAfterPopulate($data) {
        if(empty($this->_content)) {
            return;
        }

        foreach($this->_content as $widgetData) {
            $widget = new WidgetEntity($widgetData);
            $this->_widgets[] = clone $widget;
        }
    }
}


