function LinkedInWidget() {
	this._name = '';

	// Only called if target URL is a valid, existing URL
	this.getHTML = function () {
		this._html = '<iframe src="' + this._embedUrl + '" width="' + this._width + '" height="' + this._html + '" frameborder="0"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	}
}

LinkedInWidget.prototype = new BaseWidget();
LinkedInWidget.prototype.constructor = LinkedInWidget;
