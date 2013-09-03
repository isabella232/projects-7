function VideoWidget() {

	this._videoType = '';
	this._videoId = false;
	this._previewUrl = '';
	this._widgetClass = 'video-widget';

	this.getHTML = function () {
		if (this._videoType == 'youtube') {
			this._embedUrl = 'http://www.youtube.com/embed/' + this._videoId + '?wmode=transparent&autoplay=0&html5=1';
			this._html = '<iframe src="' + this._embedUrl + '" width="' + this._width + '" height="' + this._height + '" frameborder="0" wmode="Opaque" allowfullscreen></iframe>';
		} else {
			this._embedUrl = 'http://player.vimeo.com/video/' + this._videoId + '?wmode=transparent&autoplay=0&type=html5';
			this._html = '<iframe src="' + this._embedUrl + '" width="' + this._width + '" height="' + this._height + '" frameborder="0" wmode="Opaque" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
		}
		return BaseWidget.prototype.getHTML.call(this);
	}
}


VideoWidget.prototype = new BaseWidget();
VideoWidget.prototype.constructor = VideoWidget;