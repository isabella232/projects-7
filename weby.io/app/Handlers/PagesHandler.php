<?php

namespace App\Handlers;

use App\AppTrait;
use App\Entities\Weby\WebyEntity;
use App\Lib\AbstractHandler;
use App\Lib\Editor;
use App\Lib\UserTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Security\Authentication\Providers\Http\Http;
use Webiny\Component\Security\SecurityTrait;

class PagesHandler extends AbstractHandler
{
    use SecurityTrait, HttpTrait, AppTrait, UserTrait;

    /**
     * Used to show homepage (login options)
     */
    public function index()
    {
		$user = $this->security()->getUser();
        if($user && $user->isAuthenticated()) {
            $this->request()->redirect(Editor::getInstance()->createEditorUrl());
        }
    }

    public function about() {
        die('dela');
    }

    /**
     * Used for viewing Weby pages (public area)
     * @param $user
     * @param $slug
     * @param $id
     */
    public function viewWeby($user, $slug, $id) {
        $weby = new WebyEntity();
        $weby->load($id);

        // Will check if requested Weby and URL params are valid
        $this->_checkRequest($weby, $user, $slug, $id);
		
        // Asign whole weby to $this, so we can pass it to view
        $this->weby = $weby;
		$this->widgets = $weby->getContent();
		$this->setTemplatePath('templates/editor')->setTemplate('index');
    }

    public function page404() {}

    /**
     * Used for checking request, if user has edited an URL, we will automatically redirect them to correct one
     * @param $weby WebyEntity
     * @param $user String
     * @param $slug String
     * @param $id String
     */
    private function _checkRequest($weby, $user, $slug, $id) {
        // We will need config for latter use of paths
        $cfg = $this->app()->getConfig()->app;

        // If Weby was created by a valid user, that means given Weby ID was okay, else redirect to 404 page
        if(!$weby->getUser()->getEmail()) {
            $this->request()->redirect($cfg->web_path . 'asdasd', 404);
        }

        // If user edited username or title, redirect him to proper URL via 301 header data
        if($weby->getSlug() != $slug || $weby->getUser()->getUsername() != $user){
            $this->request()->redirect($cfg->web_path . $weby->getUser()->getUsername() . '/' . $weby->getSlug() . '/' . $id, 301);
        }
    }
}