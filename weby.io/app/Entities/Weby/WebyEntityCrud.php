<?php

namespace App\Entities\Weby;

use App\Entities\Widget\WidgetEntity;
use Webiny\Component\StdLib\StdLibTrait;

abstract class WebyEntityCrud extends WebyEntityProperties
{
	use StdLibTrait;

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

	protected function _onAfterLoad() {
		$this->_settings = json_decode($this->_settings, true);
		if($this->_settings == null){
			$this->_settings = [];
		}

		$this->_content = json_decode($this->_content, true);
		if($this->_content == null){
			$this->_content = [];
		}
	}
}