var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var realPath = "./assets" + pathname;
		path.exits(realPath, function (exists) {
			if (!exists) {
			// Todo
			} else {
			// Todo
			}
		});
		console.log("Request for " + pathname + " received.");

		route(handle, pathname, response, request);

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
