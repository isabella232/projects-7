function SkyDriveWidget() {

	this._widgetClass = 'skydrive-widget';
	this._resizableOptions['minWidth'] = 300;
	this._resizableOptions['minHeight'] = 300;
	this._parseErrorMessage = 'We couldn\'t insert your file. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your SkyDrive file...';

	this.getHTML = function () {
		this._html = '<textarea type="text" placeholder="Paste a SkyDrive embed code">' + test + '</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function (input) {
		return this.parseSkyDriveLink(input);
	}

	this.parseSkyDriveLink = function (link) {
		var original = link;
		var width = 429;
		var height = 357;
		if (link.indexOf('iframe') >= 0) {
			link = original.match(/src=['|"](.*?)['|"]/) ? RegExp.$1 : false;
		} else {
			return false;
		}

		var id = 'skydrive-iframe-' + this._id;
		this._html.resizable("option", "alsoResize", "#" + id);
		return '<iframe id="' + id + '" src="' + link + '" width="' + width + '" height="' + height + '" frameborder="0"></iframe>';
	}

	var test = '<iframe src="https://skydrive.live.com/embed?cid=4FB5FBB0AEF80FA0&resid=4FB5FBB0AEF80FA0%21110&authkey=AFIFN-bkDsCn_iY&em=2" width="402" height="346" frameborder="0" scrolling="no"></iframe>';
	BaseIframeWidget.prototype.init.call(this);
}

SkyDriveWidget.prototype = new BaseIframeWidget();
SkyDriveWidget.prototype.constructor = SkyDriveWidget;