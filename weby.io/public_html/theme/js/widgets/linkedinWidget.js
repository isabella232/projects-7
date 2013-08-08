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

	this.getIframe = function (input) {
		this._name = this.parseLinkedInLink(input);
		var id = 'linkedin-iframe-' + this._id;
		return '<iframe id="' + id + '" src="' + WEB + 'embed/linkedin/?name=' + this._name + '&id=' + this._id + '" width="0" height="0" frameborder="0"></iframe>';
	}

	this.parseLinkedInLink = function (link) {
		var regex = /http:\/\/www\.linkedin\.com\/in\/(\S+)/;
		var name = link.match(regex) ? RegExp.$1 : link;
		return name;
	}

	this.onIframeLoaded = function (width, height) {
		this._html.find('.loading').remove();
		this._html.find('.message').remove();
		this._html.find('input').remove();
		this.showResizeHandle();
		$('#linkedin-iframe-' + this._id).attr("width", width).attr("height", height).attr("disabled", "disabled");
		this._isContentLoaded = true;
	}
	
	this.profileNotFound = function(){
		$('#linkedin-iframe-' + this._id).remove();
		this._html.find('.loading').remove();
		this._html.find('input').show().val('');
		this._html.find('span.message').html('The profile could not be found!').show();
		this._html.click();
		this.makeEditable();
	}

	BaseIframeWidget.prototype.init.call(this);
}


LinkedInWidget.prototype = new BaseIframeWidget();
LinkedInWidget.prototype.constructor = LinkedInWidget;
