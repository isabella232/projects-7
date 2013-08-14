var Weby = function () {

	this._invalidUrls = [];

	this.logInvalidUrl = function(url) {
		this._invalidUrls.push(url);
	}
}