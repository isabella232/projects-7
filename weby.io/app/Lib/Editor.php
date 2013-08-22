<?php
namespace App\Lib;

use App\AppTrait;
use App\Entities\Weby\WebyEntity;
use Webiny\Component\StdLib\SingletonTrait;

/**
 * @package App\Lib
 */
class Editor
{
    use SingletonTrait, UserTrait, AppTrait;

	public function createEditorUrl(WebyEntity $weby = null) {
		$editor = $this->app()->getConfig()->app->web_path . $this->user()->getUsername();
		if($weby != null) {
			$editor .= '/' . $weby->getId();
		}
		return $editor;
	}
}
