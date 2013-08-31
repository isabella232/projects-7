var FlickerParser = function () {

	this._parse = function (data) {
		// Validate data
		var regex = /^<a.*?href="http:\/\/www\.flickr\.com\/photos\/.*?><img.*?><\/a>$/;
		return data.match(regex) ? data : false;
	}
}

FlickerParser.prototype = new BaseParser();
FlickerParser.prototype.constructor = FlickerParser;