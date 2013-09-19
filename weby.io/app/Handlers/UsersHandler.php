<?php

namespace App\Handlers;

use App\AppTrait;
use App\Entities\User\UserEntity;
use App\Entities\Weby\WebyEntity;
use App\Lib\AbstractHandler;
use App\Lib\Stats\Stats;
use App\Lib\UserTrait;
use App\Lib\View;
use Webiny\Component\Http\HttpTrait;
use Webiny\Component\Mailer\MailerTrait;
use Webiny\Component\StdLib\StdObject\StringObject\StringObject;

class UsersHandler extends AbstractHandler
{
    use AppTrait, HttpTrait, UserTrait, MailerTrait;

    /**
     * This will insert logged user into the database on first login to Weby.io
     */
    public function checkUserExists()
    {
        // Get data from OAuth service
        $serviceData = $this->request()->session('oauth_user')->get('oauth2_user');
		
        // Load user by email
        $user = UserEntity::getByEmail($serviceData->email);


        if (!$user) {
            // If user doesn't exist, create him, send him an e-mail,
            // update registered users statistics, create new Weby and then redirect

            $user = new UserEntity();
            $serviceData->username = UserEntity::generateUsername($serviceData->email);
            $user->populate($serviceData)->save();

            // Sending welcome e-mail to our newly created user
            $this->_sendEmail($user);

            // Create new Weby for our new user and redirect him to it
            $weby = new WebyEntity();
            $weby->setUser($this->user())->save();

            // Now update users stats
            Stats::getInstance()->updateRegisteredUsersCount();
            Stats::getInstance()->updateWebiesStats($this->user());

            $this->request()->redirect($weby->getEditorUrl());
        } else {

            // If user exists, then update it's data in Weby database,
            // Saving, so we can sync the data with our database data
            $user->populate($serviceData)->save();
            Stats::getInstance()->updateUsersLoginCount($user);
        }

        // Redirect to editor
        $this->request()->redirect($this->user()->getProfileUrl());
    }

    /**
     * Marks user - has completed introduction tour of Weby.io
     */
    public function markOnboardingDone() {
        $this->user()->markOnboardingDone();
        die();
    }

    /**
     * This sends welcome mail to our newly created user
     * @param UserEntity $user
     */
    private function _sendEmail(UserEntity $user)
    {
        $config = $this->app()->getConfig()->app;
        $mailer = $this->mailer();

        $data = [
            $user->getEmail() => [
                '{fullname}' => $user->getFirstName() . ' ' . $user->getLastName()
                ]
        ];

        // Let's build our message
        $msg = $mailer->getMessage();
        $msg->setSubject('Welcome to Weby.io!')
            ->setBodyFromTemplate($config->theme_abs_path . 'templates/emails/welcoming.tpl')
            ->setContentType('text/html')
            ->setTo($user->getEmail());

        // Send it
        $mailer->setDecorators($data);
        $mailer->send($msg);
    }
}
