<?php

namespace App\Handlers;

use App\Lib\AbstractHandler;
use App\Lib\Stats;
use Webiny\Component\Security\SecurityTrait;

class PagesHandler extends AbstractHandler
{
    use SecurityTrait;

    public function index()
    {
        $data['id'] = 1;
        $data['content'] = '[
	{
		"common": {
			"class": "LinkWidget",
			"type": "link",
			"top": "117",
			"left": "161",
			"width": "398",
			"height": "79",
			"zindex": "2",
			"rotation": "3",
			"aspectRatio": "false",
			"isLocked": "false",
			"embedUrl": ""
		},
		"specific": {
			"linkUrl": "http:\/\/index.hr",
			"linkType": "web",
			"fileName": "N\/A",
			"contentType": "text\/html",
			"contentSize": "false",
			"fileHost": "",
			"title": "\r\n\tIndex.hr\r\n",
			"description": "Index.hr - Nezavisni hrvatski news i lifestyle portal - Pro\u010ditajte najnovije vijesti, sportske novosti, i vijesti iz svijeta zabave",
			"imageUrl": "http:\/\/www.index.hr\/thumbnail.ashx?path=images2\/egipat-ubijeniprosvjedinic-getty625.jpg&width=325&height=197"
		}
	},
	{
		"common": {
			"class": "TextWidget",
			"type": "text",
			"top": "25",
			"left": "14",
			"width": "400",
			"height": "48",
			"zindex": "24",
			"rotation": "0",
			"aspectRatio": "false",
			"isLocked": "false",
			"embedUrl": ""
		},
		"specific": {
			"content": "<p>Neki tekst<strong>&nbsp;pa malo boldano,<\/strong>&nbsp;pa<a href=\"http:\/\/www.webiny.com\/\">&nbsp;malo link<\/a>&nbsp;pa&nbsp;<em>malo italic<\/em><\/p><p>Pa novi red, pa jos malo sranja i da vdiidimo na \u0161ta \u0107e t li\u010diti<\/p>"
		}
	},
	{
		"common": {
			"class": "TextWidget",
			"type": "text",
			"top": "224",
			"left": "61",
			"width": "400",
			"height": "48",
			"zindex": "25",
			"rotation": "0",
			"aspectRatio": "false",
			"isLocked": "false",
			"embedUrl": ""
		},
		"specific": {
			"content": "??"
		}
	},
	{
		"common": {
			"class": "TwitterWidget",
			"type": "twitter",
			"top": "581",
			"left": "369",
			"width": "432",
			"height": "258",
			"zindex": "26",
			"rotation": "0",
			"aspectRatio": "false",
			"isLocked": "false",
			"embedUrl": ""
		},
		"specific": {
			"tweetId": "367598733568901120",
			"tweetUser": "Chande"
		}
	}
]';

        $weby = new \App\Entities\Weby\WebyEntity();
        $weby->populate($data);
        
        $stats = \App\Lib\Stats::getInstance();
        $stats->updateWebiesStats($weby);
    }

    public function page404()
    {
        header('HTTP/1.0 404 Not Found');
    }

}

