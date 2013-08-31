function SoundCloudWidget() {

	this._trackId = '';
	this._trackColor = '';


	this.getHTML = function () {
		this._html = '<iframe width="' + this._width + '" height="' + this._height + '" scrolling="no" frameborder="no" src="' + this._embedUrl + '"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	}
}

SoundCloudWidget.prototype = new BaseWidget();
SoundCloudWidget.prototype.constructor = SoundCloudWidget;