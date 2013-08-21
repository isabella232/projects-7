<?php

namespace App\Handlers;

use App\AppTrait;
use App\Entities\Weby\WebyEntity;
use App\Lib\DatabaseTrait;
use App\Lib\AbstractHandler;
use App\Lib\Editor;
use App\Lib\Stats;
use App\Lib\UserTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Security\Authentication\Providers\Http\Http;
use Webiny\Component\Security\SecurityTrait;
use Webiny\Component\ServiceManager\ServiceManagerTrait;

class EditorHandler extends AbstractHandler
{
    use AppTrait, DatabaseTrait, SecurityTrait, HttpTrait, UserTrait, ServiceManagerTrait;

	private $_weby = null;

    public function save()
    {
        // Create new Weby entity, populate it and save into database
        $weby = new WebyEntity();

        // Get ID of existing Weby and load
        $id = $this->request()->post('id');
        if($id) {
            $weby->load($id);
			// TODO: check if weby belongs to this user
        }

        $weby->populate($this->request()->post());
		$weby->setUser($this->user())->save();

        // Update Webies stats
        $stats = Stats::getInstance();
        $stats->updateWebiesStats($weby);

        $this->request()->redirect($this->app()->getConfig()->app->editor_path);
    }

	public function route($userName, $webyId = null){
		// If username doesn't match - redirect to correct user area
		if($userName != $this->user()->getUsername()){
            $v = $this->user();
			$this->request()->redirect(Editor::getInstance()->createEditorUrl());
		}

		// Check if weby exists
		if($webyId != null){
			$this->_weby = new WebyEntity();
			$this->_weby->load($webyId);

			if(!$this->_weby->getId()){
				$this->request()->redirect(Editor::getInstance()->createEditorUrl());
			}

			if($this->_weby->getUser()->getId() != $this->user()->getId()){
				$this->request()->redirect(Editor::getInstance()->createEditorUrl());
			}
		}

		// Load Weby in editor
		$this->_editor();
	}

	private function _editor() {
		if($this->_weby == null){
			$this->showDashboard = true;
		} else {
			$this->widgets = $this->_weby->getContent();
		}

		$this->weby = $this->_weby;
		$validators = $this->app()->getConfig()->app->content_validators->toArray(true);
		$vIndex = rand(0, $validators->count() - 1);
		$this->contentValidator = $validators[$vIndex];
		$this->setTemplate('index');
	}
}

