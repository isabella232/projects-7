function GoogleDriveWidget() {

	this._widgetClass = 'googledrive-widget';
	this._resizableOptions['minWidth'] = 300;
	this._resizableOptions['minHeight'] = 300;
	this._parseErrorMessage = 'We couldn\'t insert your file. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your GoogleDrive file...';

	this.getHTML = function () {
		this._html = '<textarea type="text" placeholder="Paste a GoogleDrive embed code"></textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function (input) {
		return this.parseGoogleDriveLink(input);
	}

	this.parseGoogleDriveLink = function (link) {
		var original = link;
		var width = 402;
		var height = 327;
		if (link.indexOf('iframe') >= 0) {
			// Iframe embed
			var regex = /src=['|"](.*?)['|"]/;
			link = original.match(regex) ? RegExp.$1 : false;
			width = original.match(/width="?(\d+)"?/) ? RegExp.$1 : width;
			height = original.match(/height="?(\d+)"?/) ? RegExp.$1 : height;
		} else {
			// Document link
			link = link.replace('/pub', '/embed');
		}

		var id = 'googledrive-iframe-' + this._id;
		this._html.resizable("option", "alsoResize", "#" + id);
		return '<iframe id="' + id + '" src="' + link + '" width="' + width + '" height="' + height + '" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
	}

	BaseIframeWidget.prototype.init.call(this);
}

GoogleDriveWidget.prototype = new BaseIframeWidget();
GoogleDriveWidget.prototype.constructor = GoogleDriveWidget;