function PinterestWidget() {

	this._pinType = '';
	this._pinUrl = '';

	this.getHTML = function () {
		this._html = '<iframe id="' + id + '" src="' + this._embedUrl + '" height="'+this._height+'" width="'+this._width+'" frameborder="0"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	};
}

PinterestWidget.prototype = new BaseWidget();
PinterestWidget.prototype.constructor = PinterestWidget;