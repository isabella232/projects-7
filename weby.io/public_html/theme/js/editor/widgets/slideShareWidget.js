function SlideShareWidget() {
	this._slideShareId = '';
	this._widgetClass = 'slideshare-widget';
	this._resizableOptions['minWidth'] = 200;
	this._resizableOptions['minHeight'] = 200;
	this._parseErrorMessage = 'We couldn\'t insert your slideshow. Please try a different one.';
	this._loadingMessage = 'Loading your slideshow...';
	this._inputElement = 'textarea';

	this.getHTML = function () {
		this._html = '<textarea placeholder="Paste a Slideshare ID, embed URL or an iframe code">' + test + '</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function () {
		var id = 'slideshare-iframe-' + this._id;
		this._alsoResize = "#" + id;
		return '<iframe id="' + id + '" src="' + this._embedUrl + '" width="429" height="357" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
	};

	// This is called to construct an embed URL which will then be validated
	this.getTargetUrl = function (inputValue) {
		if (inputValue.match(/^\d+$/)) {
			this._slideShareId = inputValue;
		} else {
			// Validate link
			var parser = new SlideShareParser();
			if (!(this._slideShareId = parser.parse(inputValue))){
				return false;
			}
		}
		return 'http://www.slideshare.net/slideshow/embed_code/' + this._slideShareId;
	};

	/**
	 * EDIT methods
	 */
	this.getSaveData = function(){
		return {
			slideShareId: this._slideShareId
		}
	};

	var test = '24621277';
}

SlideShareWidget.prototype = new BaseIframeWidget();
SlideShareWidget.prototype.constructor = SlideShareWidget;