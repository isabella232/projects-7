var SlideShareParser = function () {

	this.parse = function (data) {
		BaseParser.prototype.parse.call(this, data);
		if (data.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			data = data.match(regex) ? RegExp.$1 : false;
		}

		// Validate data
		var regex = /http:\/\/www\.slideshare.net\/slideshow\/embed_code\/(\d+)/;
		return data.match(regex) ? RegExp.$1 : false;
	}
}

SlideShareParser.prototype = new BaseParser();
SlideShareParser.prototype.constructor = SlideShareParser;