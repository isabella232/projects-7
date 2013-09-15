var GooglePlusParser = function () {

	this._userId = false;
	this._postId = false;

	this._parse = function (data) {
		data = $.trim(data)
		// Validate data
		var regex = /plus.google.com\/(\d+)\/posts\/([a-zA-Z0-9]*)/;

		if (data.match(regex)) {
			this._userId = RegExp.$1;
			this._postId = RegExp.$2;
			return true;
		}
		return false;
	}

	this.getUserId = function () {
		return this._userId;
	}

	this.getPostId = function () {
		return this._postId;
	}


	// https://plus.google.com/112697084889067842727/posts/KnD3eNUi5dW
}

GooglePlusParser.prototype = new BaseParser();
GooglePlusParser.prototype.constructor = GooglePlusParser;