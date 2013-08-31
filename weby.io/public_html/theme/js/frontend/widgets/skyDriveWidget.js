function SkyDriveWidget() {

	this._skyDriveId = '';

	this.getHTML = function () {
		this._html = '<iframe src="' + this._embedUrl + '" width="' + this._width + '" height="' + this._width + '" frameborder="0" scrolling="no"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	}
}

SkyDriveWidget.prototype = new BaseWidget();
SkyDriveWidget.prototype.constructor = SkyDriveWidget;