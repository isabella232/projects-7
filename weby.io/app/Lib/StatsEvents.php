<?php

namespace App\Lib;

class StatsEvents
{
    const USER_REGISTERED = 1;
    const WEBY_CREATED = 2;

    // Widgets added events (must have format of W_{WIDGETNAME}_ADDED)
    // TODO: cannot build dynamically const name !?!?!? FFS
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
    public static $W_TWITTER_ADDED = 114;
    public static $W_WINE_ADDED = 115;
}