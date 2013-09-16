function GooglePlusWidget() {

	this._widgetClass = 'googleplus-widget';

	this.getHTML = function () {
		this._html = '<iframe src="'+this._embedUrl+'" width="' + this._width + '" height="' + this._height + '"  frameborder="0"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	}
}

GooglePlusWidget.prototype = new BaseWidget();
GooglePlusWidget.prototype.constructor = GooglePlusWidget;