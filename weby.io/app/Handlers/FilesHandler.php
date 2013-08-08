<?php

namespace App\Handlers;

use App\AppTrait;
use App\Lib\AbstractHandler;
use OAuth2\Exception;
use Webiny\Component\Http\HttpTrait;

class FilesHandler extends AbstractHandler
{
    use HttpTrait;

    /**
     * Issues a HEAD request for the given link so we can get all necessary data and print it on users screen
     */
    public function getFileInfo()
    {
        $url = $this->request('url')->query('url');
        $response = [];
        $noData = 'N/A';

        // Issues a warning on bad URL, so we use @
        $headRequestData = @get_headers($url, 1);

        // If response from server was code 200 then resource exists and we're ready for further processing
        if (!is_array($headRequestData) || !strpos($headRequestData[0], '200 OK')) {
            $this->ajaxResponse(true, 'We couldn\'t reach file you linked, is your URL correct?');
        }

        $response['url'] = $url;

        // Getting all HEAD data - if particular info doesn't exist, we return N/A message

        // Getting content type
        $response['contentType'] = isset($headRequestData['Content-Type']) ? $headRequestData['Content-Type'] : $noData;

        // Getting content size (in bytes, JS will then transform it to more human readable format like KB, MB etc.)
        $response['contentSize'] = isset($headRequestData['Content-Length']) ? $headRequestData['Content-Length'] : $noData;

        // Get parsed URL and path data
        $parsedUrl = parse_url($url);
        $response['host'] = $parsedUrl['host'];
        $pathData = pathinfo($url);
        $response['baseName'] = $pathData['basename'];

        // Response with all necessary data
        $this->ajaxResponse(false, 'URL data', $response);
    }

}

