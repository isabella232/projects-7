function SkyDriveWidget() {

	this._skyDriveId = '';
	this._widgetClass = 'skydrive-widget';
	this._resizableOptions['minWidth'] = 300;
	this._resizableOptions['minHeight'] = 300;
	this._parseErrorMessage = 'We couldn\'t insert your file. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your SkyDrive file...';
	this._checkUrl = false;

	this.getHTML = function () {
		this._html = '<textarea type="text" placeholder="Paste a SkyDrive embed code">' + test + '</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function () {
		var id = 'skydrive-iframe-' + this._id;
		this._alsoResize = "#" + id;
		return '<iframe id="' + id + '" src="' + this._embedUrl + '" width="402" height="346" frameborder="0" scrolling="no"></iframe>';
	}

	// This is called to construct an embed URL which will then be validated
	this.getTargetUrl = function (inputValue) {
		// Validate link
		var parser = new SkyDriveParser();
		if (!(this._skyDriveId = parser.parse(inputValue))) {
			return false;
		}
		return 'https://skydrive.live.com/embed?' + this._skyDriveId;
	}

	/**
	 * EDIT methods
	 */
	this.getSaveData = function(){
		return {
			skyDriveId: this._skyDriveId
		}
	};

	var test = '<iframe src="https://skydrive.live.com/embed?cid=4FB5FBB0AEF80FA0&resid=4FB5FBB0AEF80FA0%21110&authkey=AFIFN-bkDsCn_iY&em=2" width="402" height="346" frameborder="0" scrolling="no"></iframe>';
	BaseIframeWidget.prototype.init.call(this);
}

SkyDriveWidget.prototype = new BaseIframeWidget();
SkyDriveWidget.prototype.constructor = SkyDriveWidget;