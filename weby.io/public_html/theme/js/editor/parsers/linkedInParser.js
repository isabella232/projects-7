var LinkedInParser = function () {

	this._parse = function (data) {
		if(data.match(/^[a-z0-9-]*$/)){
			return data;
		}
		var regex = /linkedin\.com\/in\/(\S+)/;
		return data.match(regex) ? RegExp.$1 : false;
	}
}

LinkedInParser.prototype = new BaseParser();
LinkedInParser.prototype.constructor = LinkedInParser;