<?php

namespace App\Entities\Weby;
use App\AppTrait;
use App\Entities\User\ServiceType;
use App\Entities\Weby\WebyEntity;
use Webiny\Component\Cache\CacheTrait;
use Webiny\Component\StdLib\SingletonTrait;

/**
 * Used for social services which are integrated in our site
 * Class Social
 */
class SocialData
{
    use CacheTrait, SingletonTrait, AppTrait;

    /**
     * Gets sharing count stats for all social networks.
     * It checks for cached data, if there isn't any, then it requests data from social services.
     * In the end, if there isn't data, returns false.
     * @param \App\Entities\Weby\WebyEntity $weby
     * @internal param $url
     * @return Array
     */
    public function getAllShareCount(WebyEntity $weby)
    {
        // All private functions used here return array
        // First, try to load from cache
        $data = $this->_getCachedData($weby->getId());
        if ($data) {
            return $data;
        }

        // If no data in cache, then try to load from social services
        $data = $this->_requestAllData($weby->getPublicUrl());
        if ($data) {
            // If it succeeds, update data in database and cache
            $weby->setShareCount($data)->save();
            $this->_setCachedData($weby->getId(), $data);
            return $data;
        }

        // TODO: send error report (maybe some of our social API's have changed so we have tu update code here)

        // If we didn't get any data from cache or there was an error in
        // requesting the data from services, then return false
        return false;
    }

    /**
     * Requests all data from social services (Facebook, Google, Twitter)
     * @param $url
     * @return Array|Boolean
     */
    private function _requestAllData($url)
    {
        $data[ServiceType::FACEBOOK] = $this->_getFacebookShareCount($url);
        if ($data[ServiceType::FACEBOOK] === false) {
            return false;
        }

        $data[ServiceType::GOOGLE] = $this->_getGoogleShareCount($url);
        if ($data[ServiceType::GOOGLE] === false) {
            return false;
        }

        $data[ServiceType::TWITTER] = $this->_getTwitterShareCount($url);
        if ($data[ServiceType::TWITTER] === false) {
            return false;
        }

        return $data;
    }


    /**
     * Gets number of shares made by Twitter
     * @param $url
     * @return int|string
     */
    private function _getTwitterShareCount($url)
    {
        $content = self::_parse("http://cdn.api.twitter.com/1/urls/count.json?url=" . $url);
        $json = json_decode($content, true);
        $result['count'] = $json['count'];
        return isset($result['count']) ? self::_format_count($result['count']) : false;
    }

    /**
     * Gets number of shares made by Facebook
     * @param $url
     * @return int|string
     */
    private function _getFacebookShareCount($url)
    {
        $content = self::_parse("http://graph.facebook.com/?id=" . $url);
        $json = json_decode($content, true);
        return isset($json['shares']) ? self::_format_count($json['shares']) : false;
    }

    /**
     * Formats our number in a more human-readable format
     * @param $count
     * @return string
     */
    private function _format_count($count)
    {
        if ($count > 1000000)
            return '' . number_format(($count / 1000000), 1, '.', '') . 'M';
        if ($count > 1000)
            return '' . number_format(($count / 1000), 1, '.', '') . 'K';
        else
            return '' . $count;

    }

    /**
     * Getting data via cURL
     * @param $encUrl
     * @return mixed
     */
    private function _parse($encUrl)
    {
        $options = array(
            CURLOPT_RETURNTRANSFER => true, // return web page
            CURLOPT_HEADER => false, // don't return headers
            CURLOPT_FOLLOWLOCATION => true, // follow redirects
            CURLOPT_ENCODING => "", // handle all encodings
            CURLOPT_USERAGENT => 'sharrre', // who am i
            CURLOPT_AUTOREFERER => true, // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 5, // timeout on connect
            CURLOPT_TIMEOUT => 10, // timeout on response
            CURLOPT_MAXREDIRS => 3, // stop after 10 redirects
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => false,
        );
        $ch = curl_init();

        $options[CURLOPT_URL] = $encUrl;
        curl_setopt_array($ch, $options);

        $content = curl_exec($ch);
        $err = curl_errno($ch);
        $errmsg = curl_error($ch);

        curl_close($ch);

        if ($errmsg != '' || $err != '') {

        }
        return $content;
    }

    /**
     * Gets number of shares made by Google
     * @param $url
     * @return int|string
     */
    private function _getGoogleShareCount($url)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, "https://clients6.google.com/rpc");
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, '[{"method":"pos.plusones.get","id":"p","params":{"nolog":true,"id":"' . rawurldecode($url) . '","source":"widget","userId":"@viewer","groupId":"@self"},"jsonrpc":"2.0","key":"p","apiVersion":"v1"}]');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        $curl_results = curl_exec($curl);
        curl_close($curl);
        $json = json_decode($curl_results, true);
        return isset($json[0]['result']['metadata']['globalCounts']['count']) ? intval($json[0]['result']['metadata']['globalCounts']['count']) : false;
    }

    /**
     * Checks cache, if it has necessary data, then it returns it, else returns false
     * @param $webyId
     * @return Array|False
     */
    private function _getCachedData($webyId)
    {
        $cache = $this->cache('webiny_cache');
        $data = $cache->read('weby.share.' . $webyId);
        return $data ? unserialize($data) : false;
    }

    /**
     * Save cache, TTL is used from configuration file
     * @param $webyId
     * @param $data
     */
    private function _setCachedData($webyId, $data)
    {
        $cache = $this->cache('webiny_cache');
        $data = is_array($data) ? serialize($data) : $data;

        // Save into cache, TTL is given is used from configuration file
        $ttl = $this->app()->getConfig()->app->caching_ttl->social_share_counts;
        $cache->save('weby.share.' . $webyId, $data, $ttl);
    }

}