var listeningPort = 8080;

var http = require("http");
var url = require("url");

// Prevent script from crashing on uncaughtExceptions
process.on('uncaughtException', function (err) {
	// Do nothing
});

// Map host to HTTP method (some services can not handle HEAD request)
var map = {
	'prezi.com': 'GET'
}

function getMethod(host){
	if(host in map){
		return map[host];
	}
	return 'HEAD';
}

/**
 * Check URL and send response
 * @param targetUrl
 * @param response Response object from server
 */
function checkURL(targetUrl, response) {
	var parts = url.parse(targetUrl);

	var options = {
		method: getMethod(parts.host),
		host: parts.host,
		path: parts.path,
		timeout: 10000
	};
	var req = http.request(options,function (res) {
		if (res.statusCode == 200) {
			sendResponse({
				urlExists: true,
				data: res.headers
			}, response);
		} else {
			sendResponse({urlExists: false}, response);
		}
	}).on("error", function (e) {
			sendResponse({urlExists: false}, response);
		});
	req.end();
}

function sendResponse(data, response) {
	response.writeHead(200, {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		// Access Control to allow cross domain requests (for development only)
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'
	});
	response.write(JSON.stringify(data));
	response.end();
}

// Create server which will catch requests and process
var server = http.createServer(function (request, response) {
	// Parse request and get QUERY parameters
	var urlParts = url.parse(request.url, true);
	// Check if url exists
	checkURL(urlParts.query.url, response);
});
server.on("error", function (e) {
	// Just catch it...
});

server.listen(listeningPort, 'mrcina.ath.cx');
console.log("Listening...")