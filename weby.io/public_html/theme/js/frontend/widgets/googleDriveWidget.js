function GoogleDriveWidget() {

	this._documentId = '';
	this._documentType = '';
	this._widgetClass = 'googledrive-widget';

	this.getHTML = function(){
		this._html = '<iframe src="' + this._embedUrl + '" width="'+this._width+'" height="'+this._height+'" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	}
}

GoogleDriveWidget.prototype = new BaseWidget();
GoogleDriveWidget.prototype.constructor = GoogleDriveWidget;