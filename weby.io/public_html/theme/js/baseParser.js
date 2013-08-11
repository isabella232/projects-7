var BaseParser = function (){};

BaseParser.prototype = {

	/**
	 * Parse given resource
	 * @param data
	 * @returns boolean|string False on failure, matched string on success
	 */
	parse: function (data) {
		this._data = data;
		// Override and implement
	},

	/**
	 * Get original data passed for parsing
	 * @returns string
	 */
	getData: function(){
		return this._data;
	}
};