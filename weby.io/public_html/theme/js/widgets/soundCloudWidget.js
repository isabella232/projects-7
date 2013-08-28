function SoundCloudWidget() {

	this._trackId = '';
	this._trackColor = '';
	this._widgetClass = 'soundcloud-widget';
	this._parseErrorMessage = 'We couldn\'t insert the given URL. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your sound...';

	this._resizableOptions['minHeight'] = 166;
	this._resizableOptions['minWidth'] = 300;
	this._resizableOptions['maxHeight'] = 166;

	this.getHTML = function () {
		this._html = '<textarea type="text" placeholder="Paste a SoundCloud embed code">' + test + '</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function () {
		var id = 'soundcloud-iframe-' + this._id;
		this._alsoResize = "#" + id;
		return '<iframe id="' + id + '" width="300" height="166" scrolling="no" frameborder="no" src="' + this._embedUrl + '"></iframe>';

	}

	// This is called to construct an embed URL which will then be validated
	this.getTargetUrl = function (inputValue) {
		var parser = new SoundCloudParser();
		if ((this._trackId = parser.parse(inputValue))) {
			this._trackColor = parser.getColor();
			return 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F' + this._trackId + '&amp;color=' + this._trackColor + '&amp;auto_play=false';
		}
		return false;
	}

	/**
	 * EDIT methods
	 */
	this.getSaveData = function(){
		return {
			trackId: this._trackId,
			trackColor: this._trackColor
		}
	};

	var test = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F70703171&amp;color=ff0000&amp;auto_play=true&amp;show_artwork=false"></iframe>';
}

SoundCloudWidget.prototype = new BaseIframeWidget();
SoundCloudWidget.prototype.constructor = SoundCloudWidget;