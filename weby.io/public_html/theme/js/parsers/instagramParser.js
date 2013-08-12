var InstagramParser = function () {

	this.parse = function (data) {
		BaseParser.prototype.parse.call(this, data);

		if (data.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			data = data.match(regex) ? RegExp.$1 : false;
		}

		// Validate data
        var regex = /instagram.com\/p\/(.*?)\//;
		return data.match(regex) ? RegExp.$1 : false;
	}
}

InstagramParser.prototype = new BaseParser();
InstagramParser.prototype.constructor = InstagramParser;