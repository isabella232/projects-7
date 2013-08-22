<?php

namespace App\Entities\Weby;

use App\AppTrait;

class WebyEntity extends WebyEntityCrud
{

    use AppTrait;

    public function getUrl()
    {
        if (!$this->_url) {
            $this->_url = $this->app()->getConfig()->app->web_path .
                $this->getUser()->getUsername() . '/' . $this->getSlug() . '/' . $this->getId() . '/';
        }
        return $this->_url;
    }

    public function toJson()
    {
        return json_encode($this->toArray());

    }

    public function toArray()
    {
        return [
            'id' => $this->_id,
            'username' => $this->getUser()->getUsername(),
            'title' => $this->_title,
            'content' => is_array($this->_content) ? $this->_content : json_decode($this->_content, true)
        ];
    }
}