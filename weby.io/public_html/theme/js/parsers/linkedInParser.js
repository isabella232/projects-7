var LinkedInParser = function () {

	this.parse = function (data) {
		BaseParser.prototype.parse.call(this, data);
		var regex = /(?:https?:\/\/)?www\.linkedin\.com\/in\/(\S+)/;
		return data.match(regex) ? RegExp.$1 : false;
	}
}

LinkedInParser.prototype = new BaseParser();
LinkedInParser.prototype.constructor = LinkedInParser;