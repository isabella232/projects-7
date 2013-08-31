function InstagramWidget() {

    this._instagramId = '';

    this.getHTML = function () {
        this._html = '<iframe src="'+this._embedUrl+'" width="'+this._width+'" height="'+this._height+'" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);

    }
}

InstagramWidget.prototype = new BaseWidget();
InstagramWidget.prototype.constructor = InstagramWidget;