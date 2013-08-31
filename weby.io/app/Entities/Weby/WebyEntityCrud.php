<?php

namespace App\Entities\Weby;

use App\Entities\Widget\WidgetEntity;
use Webiny\Component\StdLib\StdLibTrait;

abstract class WebyEntityCrud extends WebyEntityProperties
{
	use StdLibTrait;

	protected function _onAfterLoad() {
		if($this->_settings == null){
			$this->_settings = [];
		} else {
			$this->_settings = json_decode($this->_settings);
		}

		$this->_content = $this->_content;
		if($this->_content == null){
			$this->_content = [];
		} else {
			$this->_content = json_decode($this->_content);
		}
	}

    protected function _onBeforeSave() {
        $this->_slug = $this->_toSlug($this->_title);
    }
}