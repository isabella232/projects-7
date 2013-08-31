var BaseParser = function (){
	this._data;
};

BaseParser.prototype = {

	/**
	 * Parse given resource
	 * @param data
	 * @returns boolean|string False on failure, matched string on success
	 */
	parse: function (data) {
		this._data = data;
		var result = this._parse(data);
		if(!result){
			App.getWeby().logInvalidUrl(data);
		}
		return result;
	},

	/**
	 * Get original data passed for parsing
	 * @returns string
	 */
	getData: function(){
		return this._data;
	}
};