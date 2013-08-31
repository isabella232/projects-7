function SlideShareWidget() {
	this._slideShareId = '';
	this._widgetClass = 'slideshare-widget';

	this.getHTML = function () {
		this._html = '<iframe src="' + this._embedUrl + '" width="' + this._width + '" height="' + this._height + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	};
}
SlideShareWidget.prototype = new BaseWidget();
SlideShareWidget.prototype.constructor = SlideShareWidget;