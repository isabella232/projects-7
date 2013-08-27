<?php

namespace App\Lib;

class StatsEvents
{
    const USER_REGISTERED = 1;
    const WEBY_CREATED = 2;
    const OAUTH_REG_BY_FACEBOOK = 3;
    const OAUTH_REG_BY_GOOGLE = 4;
    const OAUTH_REG_BY_LINKEDIN = 5;

    // Widgets added events (must have format of W_{WIDGETNAME}_ADDED)
    public static $W_ADDED = 100;
    public static $W_TEXT_ADDED = 101;
    public static $W_LINK_ADDED = 102;
    public static $W_VIDEO_ADDED = 103;
    public static $W_MAP_ADDED = 104;
    public static $W_INSTAGRAM_ADDED = 105;
    public static $W_PINTEREST_ADDED = 106;
    public static $W_FACEBOOK_ADDED = 107;
    public static $W_PREZI_ADDED = 108;
    public static $W_SLIDESHARE_ADDED = 109;
    public static $W_GOOGLEDRIVE_ADDED = 110;
    public static $W_SKYDRIVE_ADDED = 111;
    public static $W_SOUNDCLOUD_ADDED = 112;
    public static $W_LINKEDIN_ADDED = 113;
    public static $W_TWEET_ADDED = 114;
    public static $W_VINE_ADDED = 115;
    public static $W_FLICKR_ADDED = 116;

    public static function getToolName($numericRepresentation)
    {
        $map = [
            self::$W_TEXT_ADDED => 'Text',
            self::$W_LINK_ADDED => 'Link',
            self::$W_VIDEO_ADDED => 'Video',
            self::$W_MAP_ADDED => 'Google Map',
            self::$W_INSTAGRAM_ADDED => 'Instagram',
            self::$W_PINTEREST_ADDED => 'Pinterest',
            self::$W_FACEBOOK_ADDED => 'Facebook',
            self::$W_PREZI_ADDED => 'Prezi',
            self::$W_SLIDESHARE_ADDED => 'Slideshare',
            self::$W_GOOGLEDRIVE_ADDED => 'GoogleDrive',
            self::$W_SKYDRIVE_ADDED => 'SkyDrive',
            self::$W_SOUNDCLOUD_ADDED => 'Sound Cloud',
            self::$W_LINKEDIN_ADDED => 'LinkedIn',
            self::$W_TWEET_ADDED => 'Tweet',
            self::$W_VINE_ADDED => 'Vine',
            self::$W_FLICKR_ADDED => 'Flickr'
        ];

        return $map[$numericRepresentation];
    }
}