function start() {
	console.log("Request handler 'start' was called.");
	return "This is start";
}

function upload() {
	console.log("Request handler 'upload' was called.");
	return "This is upload";
}

exports.start = start;
exports.upload = upload;
