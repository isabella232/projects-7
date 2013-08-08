<?php

/**
 * Removes '/' from the end of the line,
 *
 * @param String $string
 * @return String
 */
function removeTrailingSlash($string)
{
    $string = trim($string);
    if (strlen($string) < 1) {
        return $string;
    }

    $l = strpos($string, '/', strlen($string) - 1);

    if ($l != 0) {
        $string = substr($string, 0, $l);
    } else {
        $string = $string;
    }

    return $string;
}

/**
 * Returns browser IP address
 * @return String
 */
function getIP() {
    if (isset($_SERVER['HTTP_X_FORWARD_FOR']) && $_SERVER['HTTP_X_FORWARD_FOR'] != '') {
        $ip = $_SERVER['HTTP_X_FORWARD_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
