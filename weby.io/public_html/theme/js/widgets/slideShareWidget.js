function SlideShareWidget() {

	this._widgetClass = 'slideshare-widget';
	this._resizableOptions['minWidth'] = 200;
	this._resizableOptions['minHeight'] = 200;
	this._parseErrorMessage = 'We couldn\'t insert your slideshow. Please try a different one.';
	this._inputElement = 'input';
	this._loadingMessage = 'Loading your slideshow...';

	this.getHTML = function () {
		this._html = '<input type="text" placeholder="Paste a Slideshare ID, embed URL or an iframe code" value="' + test + '"/>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function (input) {
		return this.parseSlideShareLink(input);
	}

	this.parseSlideShareLink = function (link) {
		var original = link;
		var width = 429;
		var height = 357;
		if (link.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			link = original.match(regex) ? RegExp.$1 : false;
		}

		if (link.match(/^\d+$/)) {
			link = 'http://www.slideshare.net/slideshow/embed_code/' + link;
		} else {
			// Validate link
			var regex = /http:\/\/www\.slideshare.net\/slideshow\/embed_code\/\d+.*$/;
			if (!link.match(regex)) {
				return false;
			}
		}
		var id = 'slideshare-iframe-' + this._id;
		this._alsoResize = "#" + id;
		return '<iframe id="' + id + '" src="' + link + '" width="' + width + '" height="' + height + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
	}

	var test = '24621277';
	BaseIframeWidget.prototype.init.call(this);
}

SlideShareWidget.prototype = new BaseIframeWidget();
SlideShareWidget.prototype.constructor = SlideShareWidget;