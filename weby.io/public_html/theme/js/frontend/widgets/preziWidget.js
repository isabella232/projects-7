function PreziWidget() {

	this._preziId = '';

	this.getHTML = function () {
		this._html = '<iframe width="' + this._width + '" height="' + this._height + '" src="' + this._embedUrl + '?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;" frameBorder="0"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	};
}

PreziWidget.prototype = new BaseWidget();
PreziWidget.prototype.constructor = PreziWidget;