function LinkedInWidget() {
	this._name = '';
	this._widgetClass = 'linkedin-widget';

	// Only called if target URL is a valid, existing URL
	this.getHTML = function () {
		this._html = '<iframe src="' + this._embedUrl + '" width="' + this._width + '" height="' + this._height + '" frameborder="0"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	}

	this.onWidgetInserted = function(){
		this._html.show();
	}
}

LinkedInWidget.prototype = new BaseWidget();
LinkedInWidget.prototype.constructor = LinkedInWidget;
