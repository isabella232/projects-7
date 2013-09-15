var arguments = process.argv.splice(2);
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;

// Get hostIp and hostPort
var temp = arguments[0].split(':');
var listeningHost = temp[0];
var listeningPort = parseInt(temp[1]);
var processLabel = listeningHost + ':' + listeningPort;

// Prevent script from crashing on uncaughtExceptions
process.on('uncaughtException', function (err) {
	//process.stdout.write(err)
});

// Map host to HTTP method (some services can not handle HEAD request)
var map = {
	'prezi.com': {
		method: 'GET'
	}
}

function getMethod(host) {
	if (host in map) {
		var rule = map[host];
		if ('method' in rule) {
			return rule.method;
		}
	}
	return 'HEAD';
}

function parseHttpHeaders(data) {

	// In case the response contains <html> - remove it

	data = data.split("\n\r").filter(function (element, index, array) {
		// Remove elements that contain <html> tags (when using GET)
		if(element.indexOf('<html>') > -1){
			return false;
		}
		return element != '\n';
	});

	// Split requests
	var lastUrl = data.pop();
	var header = data.pop();
	var res = {};
	res.httpVersion = header.match(/(http\/\S+)/i) ? RegExp.$1 : false;
	res.statusCode = header.match(/http\/\S+\s(\d+)/i) ? RegExp.$1 : false;
	res.contentType = header.match(/content-type:\s?([a-zA-Z\/_\.-]*)/i) ? RegExp.$1 : false;
	res.contentLength = header.match(/content-length:\s?(\d+)/i) ? RegExp.$1 : false;
	res.lastUrl = lastUrl.match(/LastURL\[(.*?)\]/) ? RegExp.$1 : false;

	// Handle google edge-case
	if(res.lastUrl.indexOf('accounts.google.com') > -1){
		res.statusCode = 404;
	}

	return res;
}

/**
 * Check URL and send response
 * @param targetUrl
 * @param response Response object from server
 */
function checkURL(targetUrl, response) {
	if (typeof targetUrl == "undefined") {
		return sendResponse({urlExists: false}, response);
	}

	//process.stdout.write('[INFO][' + processLabel + ']: Received:  ' + targetUrl);

	var parts = url.parse(targetUrl);

	if (getMethod(parts.host) == 'HEAD') {
		var command = 'curl  -w "LastURL[%{url_effective}]" -i -I -L --max-redirs 10 "' + targetUrl + '"';
	} else {
		var command = 'curl -w "LastURL[%{url_effective}]" -i -L -X GET --max-redirs 10 "' + targetUrl + '"';
	}

	//process.stdout.write(command)

	child = exec(command, function (error, stdout, stderr) {
		var res = parseHttpHeaders(stdout);
		//process.stdout.write('[INFO][' + processLabel + ']: Checking ' + targetUrl + ' | Response: ' + res.statusCode);

		if (error != null) {
			return sendResponse({urlExists: false}, response);
		} else {
			res.fileHost = parts.host;
			res.fileName = parts.pathname.match(/.*\/(.*)/) ? RegExp.$1 : 'N/A';
			if (res.statusCode == 200) {
				return sendResponse({urlExists: true, data: res}, response);
			}
		}
		sendResponse({urlExists: false}, response);
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
	// Parse request and get QUERY parameters
	var urlParts = url.parse(request.url, true);
	// Check if url exists
	checkURL(urlParts.query.url, response);
});
server.on("error", function (e) {
	// Just catch it...
});

server.listen(listeningPort, listeningHost);
process.stdout.write('[INFO][' + processLabel + ']: Listening...')