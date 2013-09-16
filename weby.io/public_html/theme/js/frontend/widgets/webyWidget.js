function WebyWidget() {

	this._widgetClass = 'weby-widget';

	this.getHTML = function () {
		this._html = '<iframe src="'+this._embedUrl+'" width="' + this._width + '" height="' + this._height + '"  frameborder="0"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	}
}

WebyWidget.prototype = new BaseWidget();
WebyWidget.prototype.constructor = WebyWidget;