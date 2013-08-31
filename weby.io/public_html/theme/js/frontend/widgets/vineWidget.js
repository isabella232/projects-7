function VineWidget() {

	this._vineId = '';
	this._widgetClass = 'vine-widget';

	this.getHTML = function () {
		this._html = '<iframe class="vine-embed" src="' + this._embedUrl + '" width="' + this._width + '" height="' + this._height + '" frameborder="0"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	}
}

VineWidget.prototype = new BaseWidget();
VineWidget.prototype.constructor = VineWidget;