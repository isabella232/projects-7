var SkyDriveParser = function () {

	this._parse = function (data) {
		if (data.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			data = data.match(regex) ? RegExp.$1 : false;
		}

		// Validate data
		var regex = /https:\/\/skydrive\.live\.com\/embed\?(.*?)$/;
		return data.match(regex) ? RegExp.$1 : false;
	}
}

SkyDriveParser.prototype = new BaseParser();
SkyDriveParser.prototype.constructor = SkyDriveParser;