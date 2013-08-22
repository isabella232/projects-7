<?php

namespace App\Handlers;

use App\AppTrait;
use App\Entities\User\UserEntity;
use App\Entities\Weby\WebyEntity;
use App\Lib\AbstractHandler;
use App\Lib\Editor;
use App\Lib\Stats;
use App\Lib\UserTrait;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\StdLib\StdObject\StringObject\StringObject;

class UsersHandler extends AbstractHandler
{
	use AppTrait, HttpTrait, UserTrait;

	/**
	 * This will insert logged user into the database on first login to Weby.io
	 */
	public function checkUserExists() {
		// Get data from OAuth service
		$serviceData = $this->request()->session('oauth_user')->get('oauth2_user');

		// Load user by email
		$user = new UserEntity();
		$user->getByEmail($serviceData->email);

		if(!$user->getId()) {
            // If user doesn't exist, create him, update registered users statistics, create new Weby and then redirect

            $serviceData->username = UserEntity::generateUsername($serviceData->email);
            $user->populate($serviceData)->save();

			$stats = Stats::getInstance();
			$stats->updateRegisteredUsers();

			// Create new Weby for our new user and redirect him to it
			$weby = new WebyEntity();
			$emptyWebyData = [
				'title' => 'Untitled',
				'slug'  => 'untitled',
				'user'  => $user->getId()
			];
			$weby->populate($emptyWebyData)->save();

			$this->request()->redirect(Editor::getInstance()->createEditorUrl($weby));

		} else {
            // If user exists, then update it's data in Weby database,
            // Saving, so we can sync the data with our database data
            $user->populate($serviceData)->save();

			// Redirect to editor
			// @TODO: redirect to new weby or load last edited
			$this->request()->redirect(Editor::getInstance()->createEditorUrl());
		}
	}
}