function GoogleDriveWidget() {

	this._documentId = '';
	this._documentType = '';
	this._widgetClass = 'googledrive-widget';
	this._resizableOptions['minWidth'] = 300;
	this._resizableOptions['minHeight'] = 300;
	this._parseErrorMessage = 'We couldn\'t insert your file. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your GoogleDrive file...';

	this.getHTML = function () {
		this._html = '<textarea type="text" placeholder="Paste a GoogleDrive embed code">https://docs.google.com/spreadsheet/pub?key=0AjdjFGIeoFTCdDdKN1gtYVROUllhY3BZYms2ZTBocUE&output=html&widget=true</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function () {
		if (this._documentType != 'spreadsheet') {
			this._embedUrl = this._embedUrl.replace('/pub', '/embed');
		}
		var id = 'googledrive-iframe-' + this._id;
		this._alsoResize = "#" + id;
		return '<iframe id="' + id + '" src="' + this._embedUrl + '" width="480" height="389" frameborder="0" width="960" height="749" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
	}


	// This is called to construct an embed URL which will then be validated
	this.getTargetUrl = function (inputValue) {
		// Validate link
		var parser = new GoogleDriveParser();
		if (!(this._documentId = parser.parse(inputValue))) {
			return false;
		}
		this._documentType = parser.getDocumentType();

		if (this._documentType == 'spreadsheet') {
			return 'https://docs.google.com/spreadsheet/pub?key=' + this._documentId;
		}
		return 'https://docs.google.com/' + this._documentType + '/d/' + this._documentId + '/pub';
	}

	this.onContentLoaded = function () {
		this._html.find('iframe').show();
	}

	/**
	 * EDIT methods
	 */
	this.getSaveData = function(){
		return {
			documentId: this._documentId,
			documentType: this._documentType
		}
	}

	BaseIframeWidget.prototype.init.call(this);
}

GoogleDriveWidget.prototype = new BaseIframeWidget();
GoogleDriveWidget.prototype.constructor = GoogleDriveWidget;