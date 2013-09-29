var arguments = process.argv.splice(2);
var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native
var http = require('http');
var url = require('url');

// Database config
var DB_USER = "root";
var DB_PASS = "paveL!";
var DB_NAME = "weby.io";

// Get hostIp and hostPort
var temp = arguments[0].split(':');
var listeningHost = temp[0];
var listeningPort = parseInt(temp[1]);
var processLabel = listeningHost + ':' + listeningPort;

// Connection string
var conString = "postgres://" + DB_USER + ":" + DB_PASS + "@localhost/" + DB_NAME;


function findTags(query, response) {
	if (typeof query == "undefined") {
		return sendResponse([], response);
	}

	pg.connect(conString, function(err, client) {
		if(err) {
			return sendResponse([], response);
		}
		client.query('SELECT * FROM w_tags WHERE tag LIKE $1::varchar LIMIT 10', ['%'+query+'%'], function(err, result) {
			if(err) {
				return sendResponse([], response);
			}
			return sendResponse(result.rows, response);
		});
	});
}

function sendResponse(data, response) {
	response.writeHead(200, {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache',
		'Connection': 'close',
		// Access Control to allow cross domain requests (for development only)
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'
	});
	response.write(JSON.stringify(data));
	response.end();
}


// Create server which will catch requests and process
var server = http.createServer(function (request, response) {

	// Make sure request came from domain name that is allowed to use this service
	if('referer' in request.headers){
		if(request.headers['referer'].indexOf('homeftp.net') > -1){
			// Parse request and get QUERY parameters
			var urlParts = url.parse(request.url, true);

			// Find tags
			return findTags(urlParts.query.tag, response);
		}
	}
	return sendResponse({message: 'Dude, you shouldn\'t be here!'}, response)
});

server.on("error", function (e) {
	// Just catch it...
});

server.listen(listeningPort, listeningHost);
process.stdout.write('[INFO][' + processLabel + ']: Listening...\n')