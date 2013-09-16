function PinterestWidget() {

	this._pinType = '';
	this._pinUrl = '';
	this._pinSize = {
		pin: {
			width:237,
			height: 313
		},
		board: {
			width:582,
			height: 261
		},
		user: {
			width:582,
			height: 261
		}
	}
	this._widgetClass = 'pinterest-widget';
	this._isResizable = false;
	this._parseErrorMessage = 'We couldn\'t insert your Pin. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your Pin...';

	this.getHTML = function () {
		this._html = '<textarea placeholder="Paste a URL of a Pinterest profile, board or a pin">http://pinterest.com/pin/181269953723991195/</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function () {
		var id = 'pinterest-iframe-' + this._id;
		this._embedUrl = WEB + 'embed/pinterest/?pinUrl=' + encodeURIComponent(this._pinUrl) + '&pinType=' + this._pinType;
		return '<iframe id="' + id + '" src="' + this._embedUrl + '" height="'+this._pinSize[this._pinType].height+'" width="'+this._pinSize[this._pinType].width+'" frameborder="0"></iframe>';
	};

	// This is called to construct an embed URL which will then be validated
	this.getTargetUrl = function (inputValue) {
		var parser = new PinterestParser();
		if ((this._pinUrl = parser.parse(inputValue))) {
			this._pinType = parser.getPinType();
			return this._pinUrl;
		}
		return false;
	};

	this.onContentLoaded = function(){
		if(this._pinType == 'pin'){
			var jFrame = this.body('iframe');
			var height = jFrame.contents().find('div *').height();
			jFrame.contents().find('div').height(height);
			jFrame.attr("height", height);
		}
		this.contentLoaded();
	};

	/**
	 * EDIT methods
	 */
	this.getSaveData = function(){
		return {
			pinType: this._pinType,
			pinUrl: this._pinUrl
		}
	};
}

PinterestWidget.prototype = new BaseIframeWidget();
PinterestWidget.prototype.constructor = PinterestWidget;