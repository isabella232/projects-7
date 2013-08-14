var TwitterParser = function () {

	this._tweetId;
	this._tweetHtml;
	this._tweetUrl;

	this._parse = function (data) {

		// First get the complete blockquote content
        var regex = /<blockquote class="twitter-tweet">(.*?)<\/blockquote>/;
		this._tweetHtml = data.match(regex) ? RegExp.$1 : false;


		regex = /twitter\.com\/\S+\/statuses\/(\d+)/;
		this._tweetId = data.match(regex) ? RegExp.$1 : false;

		regex = /(https:\/\/twitter\.com\/\S+\/statuses\/\d+)/;
		this._tweetUrl = data.match(regex) ? RegExp.$1 : false;

		return this._tweetUrl;
	}

	this.getTweetId = function(){
		return this._tweetId;
	}

	this.getTweetHtml = function(){
		return this._tweetHtml;
	}

	this.getTweetUrl = function(){
		return this._tweetUrl;
	}
}

TwitterParser.prototype = new BaseParser();
TwitterParser.prototype.constructor = TwitterParser;