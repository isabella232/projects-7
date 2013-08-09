function LinkedInWidget() {
	this._name = '';
	this._isResizable = false;
	this._widgetClass = 'linkedin-widget';
	this._parseErrorMessage = 'We couldn\'t insert this LinkedIn profile. Please try a different one.';
	this._inputElement = 'input';
	this._loadingMessage = 'Loading LinkedIn profile...';
	this._customOnLoadHandler = true;
	this._isRotatable = false;

	this.getHTML = function () {
		this._html = '<input type="text" placeholder="Enter a public profile URL of a LinkedIn member" value="gorancandrlic"/>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	// Only called if target URL is a valid, existing URL
	this.getIframe = function () {
		return '<iframe id="linkedin-iframe-' + this._id + '" src="' + WEB + 'embed/linkedin/?name=' + this._name + '&id=' + this._id + '" width="0" height="0" frameborder="0"></iframe>';
	}

	// This is called to construct an embed URL which will then be validated
	this.getTargetUrl = function(inputValue){
		this.parseLinkedInLink(inputValue);
		return 'http://www.linkedin.com/in/' + this._name;
	}

	this.parseLinkedInLink = function (link) {
		this._name = link.match(/(?:https?:\/\/)?www\.linkedin\.com\/in\/(\S+)/) ? RegExp.$1 : link;
	}

	this.onIframeLoaded = function (width, height) {
		this._html.find('.loading').remove();
		this._html.find('.message').remove();
		this._html.find('input').remove();
		this.showResizeHandle();
		$('#linkedin-iframe-' + this._id).attr("width", width).attr("height", height).attr("disabled", "disabled");
		this._isContentLoaded = true;
	}

	BaseIframeWidget.prototype.init.call(this);
}


LinkedInWidget.prototype = new BaseIframeWidget();
LinkedInWidget.prototype.constructor = LinkedInWidget;
