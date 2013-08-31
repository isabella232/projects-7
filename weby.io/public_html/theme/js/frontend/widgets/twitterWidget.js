function TwitterWidget() {
	this._tweetId = '';
	this._tweetUser = '';

	this._getEmbedCode = function () {
		return $('<blockquote class="twitter-tweet"><a href="https://twitter.com/' + this._tweetUser + '/statuses/' + this._tweetId+'"></a></blockquote>' +
			'<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>');
	};


	this.getHTML = function () {
		this._html = this._getEmbedCode().width(this._width).height(this._height);
		return BaseWidget.prototype.getHTML.call(this);
	};
}

TwitterWidget.prototype = new BaseWidget();
TwitterWidget.prototype.constructor = TwitterWidget;