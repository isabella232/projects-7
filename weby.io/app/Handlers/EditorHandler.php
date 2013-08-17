<?php

namespace App\Handlers;

use App\AppTrait;
use App\Lib\DatabaseTrait;
use App\Lib\AbstractHandler;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\ServiceManager\ServiceManagerTrait;
use Webiny\Component\Storage\File\LocalFile;

class EditorHandler extends AbstractHandler
{
	use AppTrait, DatabaseTrait, HttpTrait, ServiceManagerTrait;

	public function index($id = false) {
		if($id){
			$storage = $this->service('storage.local');
			$file = new LocalFile('weby'.$id.'.json', $storage);
			$this->widgets = $file->getContents();
		}
		$validators = $this->app()->getConfig()->app->content_validators->toArray(true);
		$vIndex = rand(0, $validators->count() - 1);
		$this->contentValidator = $validators[$vIndex];
	}

	public function save(){
		$widgets = $this->request()->post('widgets');
		$storage = $this->service('storage.local');

		$file = new LocalFile('weby.json', $storage);
		if($file->setContent(json_encode($widgets))){
			$this->ajaxResponse(false, 'Weby saved succesfully!');
		} else {
			$this->ajaxResponse(true, 'Couldn\'t save your Weby to disk!');
		}
	}
}

