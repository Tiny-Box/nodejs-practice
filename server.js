var http = require("http");
var mime = require("./mime").types;
var path = require("path");
var fs = require("fs");
var sys = require("sys");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var realPath = "./assets" + pathname;
		//if (realPath.search(".html") === -1)
		//	realPath += ".html";
		path.exists(realPath, function (exists) {
			if (!exists) {
				response.writeHead(404, {'Content-Type': 'text/plain'});
				response.write("I'm sorry, I don't find it.");
				response.end();
			} else {
				fs.readFile(realPath, "binary", function (err, file) {
					if (err) {
						response.writeHead(500, {'Content-Type': 'text/plain'});
						response.end(err);
					} else {
						var ext = path.extname(realPath);
						console.log(realPath);
						console.log(ext);
						ext = ext ? ext.slice(1) : 'unknown';
						var contentType = mime[ext] || "text/plain";
						response.writeHead(200, {'Content-Type': contentType});
						response.write(file, "binary");
						response.end();
					}
				});
			}
		});
		console.log("Request for " + pathname + " received.");

//		route(handle, pathname, response, request);

//		request.addListener("data", function(postDataChunk) {
//			postData += postDataChunk;
//			console.log("Received POST data hunk '" + postDataChunk + "'.");		});
//
//		request.addListener("end", function() {
//			route(handle, pathname, response, postData);
//		});
	}
	
	
	http.createServer(onRequest).listen(8884);
	
	console.log("Server has started.");
}

exports.start = start;
