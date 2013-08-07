function LinkedInWidget() {

	this._isResizable = false;
	this._widgetClass = 'linkedin-widget';
	this._parseErrorMessage = 'We couldn\'t insert this LinkedIn profile. Please try a different one.';
	this._inputElement = 'input';
	this._loadingMessage = 'Loading LinkedIn profile...';

	this.getHTML = function () {
		this._html = '<input type="text" placeholder="Enter a public profile URL of a LinkedIn member" value="gorancandrlic"/>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function (input) {
		var name = this.parseLinkedInLink(input);
		var id = 'linkedin-iframe-' + this._id;
		return '<iframe id="' + id + '" src="' + WEB + 'embed/linkedin/?name=' + name + '&id=' + id + '" width="370" frameborder="0"></iframe>';
	}

	this.parseLinkedInLink = function (link) {
		var regex = /http:\/\/www\.linkedin\.com\/in\/(\S+)/;
		var name = link.match(regex) ? RegExp.$1 : link;
		return name;
	}

	BaseIframeWidget.prototype.init.call(this);
}


LinkedInWidget.prototype = new BaseIframeWidget();
LinkedInWidget.prototype.constructor = LinkedInWidget;
