function PreziWidget() {

	this._preziId = '';
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

	this.getIframe = function () {
		var id = 'prezi-iframe-' + this._id;
		this._alsoResize = "#" + id;
		return '<iframe id="' + id + '" src="'+this._embedUrl+'?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;" width="550" height="400" frameBorder="0"></iframe>';
	};

	// This is called to construct an embed URL which will then be validated
	this.getTargetUrl = function (inputValue) {
		var parser = new PreziParser();
		if ((this._preziId = parser.parse(inputValue))) {
			return 'http://prezi.com/embed/' + this._preziId + '/';
		}
		return false;
	};

	/**
	 * EDIT methods
	 */
	this.getSaveData = function(){
		return {
			preziId: this._preziId
		}
	};

	var test = 'http://prezi.com/embed/f2eb2757342dc679050f1d1d6b098920375ffd86/';
}

PreziWidget.prototype = new BaseIframeWidget();
PreziWidget.prototype.constructor = PreziWidget;