var PreziParser = function () {

	this._parse = function (data) {
		var original = data;
		if (data.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			data = original.match(regex) ? RegExp.$1 : false;
		}
		// Validate link
		var regex = /https?:\/\/(?:www\.)?prezi.com\/embed\/(.*?)\//;
		return data.match(regex) ? RegExp.$1 : false;
	}
}

PreziParser.prototype = new BaseParser();
PreziParser.prototype.constructor = PreziParser;