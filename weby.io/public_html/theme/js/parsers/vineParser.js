var VineParser = function () {

	this._vineId;

	this._parse = function (data) {

		if (data.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			data = data.match(regex) ? RegExp.$1 : false;
		}

		// Validate data
        var regex = /https?:\/\/(?:www\.)?vine\.co\/v\/([a-zA-Z0-9]*)/;
		return this._vineId = data.match(regex) ? RegExp.$1 : false;
	}
}

VineParser.prototype = new BaseParser();
VineParser.prototype.constructor = VineParser;