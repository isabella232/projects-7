var GoogleDriveParser = function () {

	this._documentType;
	this._documentId;

	this.parse = function (data) {
		BaseParser.prototype.parse.call(this, data);
		if (data.indexOf('iframe') >= 0) {
			var regex = /src=['|"](.*?)['|"]/;
			data = data.match(regex) ? RegExp.$1 : false;
		}

		// Validate data
		if(data.indexOf('spreadsheet') > 0){
			var regex = /https:\/\/docs\.google\.com\/\S+\?key=(.*?)&\S+/;
			this._documentType =  'spreadsheet';
			return this._documentId = data.match(regex) ? RegExp.$1 : false;
		} else {
			var regex = /https:\/\/docs\.google\.com\/([a-z]*)\/d\/(\S+)\//;
			var res = data.match(regex) ? RegExp.$2 : false;
			if(res){
				this._documentType = RegExp.$1;
				return this._documentId = RegExp.$2;
			}
			return false;
		}
	}

	this.getDocumentId = function(){
		return this._documentId;
	}

	this.getDocumentType = function(){
		return this._documentType;
	}
}

GoogleDriveParser.prototype = new BaseParser();
GoogleDriveParser.prototype.constructor = GoogleDriveParser;