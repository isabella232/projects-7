var TwitterParser = function () {

	this._tweetId = false;
	this._tweetUser = false;

	this._parse = function (data) {

		var regex = /https:\/\/twitter\.com\/(\S+)\/status(?:es)?\/(\d+)/;
		if(data.match(regex)){
			this._tweetId = RegExp.$2;
			this._tweetUser = RegExp.$1;
		}

		return this._tweetId;
	}

	this.getTweetId = function(){
		return this._tweetId;
	}

	this.getTweetUser = function(){
		return this._tweetUser;
	}
}

TwitterParser.prototype = new BaseParser();
TwitterParser.prototype.constructor = TwitterParser;