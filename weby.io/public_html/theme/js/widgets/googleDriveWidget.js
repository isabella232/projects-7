function GoogleDriveWidget() {

	this._widgetClass = 'googledrive-widget';
	this._resizableOptions['minWidth'] = 300;
	this._parseErrorMessage = 'We couldn\'t insert your file. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your GoogleDrive file...';

	this.getHTML = function () {
		this._html = '<textarea type="text" placeholder="Paste a GoogleDrive embed code"></textarea>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};


	this.getIframe= function(input){
		return this.parseGoogleDriveLink(input);
	}

	this.parseGoogleDriveLink = function (link) {
		// Add support for share links prsing
		var original = link;
		var width = 402;
		var height = 327;
		if (link.indexOf('iframe') >= 0) {
			var regex = /src=['|"](.*?)['|"]/;
			link = original.match(regex) ? RegExp.$1 : false;
			width = original.match(/width="?(\d+)"?/) ? RegExp.$1 : width;
			height = original.match(/height="?(\d+)"?/) ? RegExp.$1 : height;
		} else {
			return false;
		}

		var id = 'googledrive-iframe-' + this._id;
		this._html.resizable("option", "alsoResize", "#" + id);
		this.setResizableAspectRatio(width / height);
		return '<iframe id="' + id + '" src="' + link + '" width="' + width + '" height="' + height + '" frameborder="0"></iframe>';
	}

	BaseWidget.prototype.init.call(this);
}

GoogleDriveWidget.prototype = new BaseIframeWidget();
GoogleDriveWidget.prototype.constructor = GoogleDriveWidget;

/*
 <iframe src='https://googledrive.live.com/embed?cid=20F065AFC1ACDB2E&resid=20F065AFC1ACDB2E%21723&authkey=&em=2&wdAr=1.3333333333333333&Embed=1' width='402px' height='327px' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> presentation, powered by <a target='_blank' href='http://office.com/webapps'>Office Web Apps</a>.</iframe>*/

/*<iframe src="https://docs.google.com/document/d/1o8NGEELqVuEMOovj5nBjMHK-9KW-RKHoZAHg2ZwRhP0/pub?embedded=true"></iframe>*/
