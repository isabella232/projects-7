var dgram = require("dgram");
var http = require("http");
var buffer = require("buffer");

var client = dgram.createSocket("udp4");

client.on('error', function (e) {
	console.log('Error while trying to relay data: ' + e.message);
});

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
	console.log("Server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
	relay(msg);
});

server.on("listening", function () {
	var address = server.address();
	console.log("Server listening " + address.address + ":" + address.port);
});

server.bind(41234);

function relay(data) {
	// Prepare data
	data = JSON.parse(data);
	var destination = data.params.destination;
	delete data.params.destination

	var query = {
		jsonrpc: "2.0",
		method: data.method,
		params: data.params
	};

	var json = JSON.stringify(query);
	console.log(json);

	// Relay data
	destination.forEach(function (d) {
		console.log("Relaying message to WebinyNotifier at " + d);
		var tray = d.split(':');

		var req = http.request({
			host: tray[0],
			port: tray[1],
			method: "POST",
			headers: {
				"Accept": "*/*",
				"Content-Type": "application/json-rpc; charset=utf-8",
				"Content-Length": json.length
			}
		}, function(res) {
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log('BODY: ' + chunk);
			})}
		);

		req.on('error', function (e) {
			console.log('Problem with request: ' + e.message);
		});

		req.write(json);

		req.end();
		console.log("Relaying completed!");
	});


}