function PreziWidget() {

	this._widgetClass = 'prezi-widget';
	this._resizableOptions['minWidth'] = 300;
	this._resizableOptions['minHeight'] = 300;
	this._parseErrorMessage = 'We couldn\'t insert your presentation. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your Prezi presentation...'

	this.getHTML = function () {
		this._html = '<textarea placeholder="Paste a Prezi embed iframe or embed URL">' + test + '</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function (input) {
		return this.parsePreziLink(input);
	}

	this.parsePreziLink = function (link) {
		var original = link;
		var width = 550;
		var height = 400;
		if (link.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			link = original.match(regex) ? RegExp.$1 : false;
		}
		// Validate link
		var regex = /https?:\/\/(?:www\.)?prezi.com\/embed\/(.*?)\//;
		var preziId = link.match(regex) ? RegExp.$1 : false;

		var id = 'prezi-iframe-' + this._id;
		this._alsoResize = "#" + id;
		if (preziId) {
			return '<iframe id="' + id + '" src="' + WEB + 'embed/prezi/?preziId=' + preziId + '" width="' + width + '" height="' + height + '" frameBorder="0"></iframe>';
		}
		return  false;
	}

	BaseIframeWidget.prototype.init.call(this);

	var test = 'http://prezi.com/embed/f2eb2757342dc679050f1d1d6b098920375ffd86/';
}

PreziWidget.prototype = new BaseIframeWidget();
PreziWidget.prototype.constructor = PreziWidget;