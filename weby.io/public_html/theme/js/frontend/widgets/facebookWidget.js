function FacebookWidget() {

	this._facebookUrl = '';
	this._facebookType = '';

	this.getHTML = function () {
		this._html = '<iframe src="' + this._embedUrl +
			'&amp;width=292&amp;height=427&amp;colorscheme=light&amp;show_faces=false&amp;header=true&amp;' +
			'stream=true&amp;show_border=false&amp;appId=276232862515995" scrolling="no" frameborder="0" ' +
			'style="display: none; border:none; overflow:hidden; width:292px; height:427px;" width="292" height="427" ' +
			'allowTransparency="true"></iframe>';
		return BaseWidget.prototype.getHTML.call(this);
	};
}

FacebookWidget.prototype = new BaseWidget();
FacebookWidget.prototype.constructor = FacebookWidget;
