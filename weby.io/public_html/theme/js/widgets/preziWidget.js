function PreziWidget() {

	this._widgetClass = 'prezi-widget';
	this._resizableOptions['minWidth'] = 300;
	this._resizableOptions['minHeight'] = 300;
	this._parseErrorMessage = 'We couldn\'t insert your presentation. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your Prezi presentation...'
	this._preziId = false;

	this.getHTML = function () {
		this._html = '<textarea placeholder="Paste a Prezi embed iframe or embed URL">' + test + '</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function (targetUrl) {
		var id = 'prezi-iframe-' + this._id;
		this._alsoResize = "#" + id;
		return '<iframe id="' + id + '" src="' + WEB + 'embed/prezi/?preziId=' + this._preziId + '" width="" height="" frameBorder="0"></iframe>';
	}

	// This is called to construct an embed URL which will then be validated
	this.getTargetUrl = function (inputValue) {
		this.parsePreziLink(inputValue);
		if (this._preziId) {
			return 'http://prezi.com/embed/' + this._preziId + '/';
		}
		return false;

	}

	this.parsePreziLink = function (link) {
		var original = link;
		if (link.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			link = original.match(regex) ? RegExp.$1 : false;
		}
		// Validate link
		var regex = /https?:\/\/(?:www\.)?prezi.com\/embed\/(.*?)\//;
		this._preziId = link.match(regex) ? RegExp.$1 : false;
	}

	BaseIframeWidget.prototype.init.call(this);

	var test = 'http://prezi.com/embed/f2eb2757342dc679050f1d1d6b098920375ffd86/';
}

PreziWidget.prototype = new BaseIframeWidget();
PreziWidget.prototype.constructor = PreziWidget;