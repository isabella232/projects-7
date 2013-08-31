function LinkWidget() {

	// Url contains the original URL of the content
	this._linkUrl = '';
	// file, web, image
	this._linkType = '';
	// File data
	this._fileName = '';
	this._contentType = '';
	this._contentSize = '';
	this._fileHost = '';
	// Web data
	this._title = '';
	this._description = '';
	this._imageUrl = '';


// Methods for generating content for various link types (eg. jpg, gif, ppt, xls ...)
// For every filetype, you can specify it's template (in LinkTool.ALLOWED_TYPES object)

// Renders standard file information box
	this.generateFileInfo = function () {
		var tpl = $('script#link-widget-file-tpl').html();
		tpl = tpl.replace('{url}', this._linkUrl);
		tpl = tpl.replace('{extension}', LinkTool.ALLOWED_TYPES[this._contentType]['extension']);
		tpl = tpl.replace('{baseName}', this._fileName);
		tpl = tpl.replace('{type}', LinkTool.ALLOWED_TYPES[this._contentType]['fileType']);
		tpl = tpl.replace('{size}', App.formatFileSize(this._contentSize));
		tpl = tpl.replace('{host}', this._fileHost);
		return $(tpl);
	};

// This will render web link template
	this.generateLinkEmbed = function () {
		this._verifyUrl();
		var tpl = $('script#link-widget-link-tpl').html();
		tpl = tpl.replace(/{url}/g, this._linkUrl);
		tpl = tpl.replace('{title}', this.truncate(this._title, 35, '...'));
		tpl = tpl.replace('{description}', this.truncate(this._description, 140, '...'));
		tpl = $(tpl.replace('{imageUrl}', this._imageUrl));
		if (!this._imageUrl) {
			tpl.find('img').remove();
		}
		return tpl;
	};

// Renders image
	this.generateImage = function () {
		this._isInteractive = false;
		var tpl = $('script#link-widget-image-tpl').html();
		tpl = tpl.replace('{image_id}', 'image-link-' + this._id);
		tpl = tpl.replace('{url}', this._linkUrl);
		return $(tpl);
	};


	this.getHTML = function () {
		if (this._linkType == 'image') {
			this._html = this.generateImage().width(this._width).height(this._height);
		} else if (this._linkType == 'file') {
			this._html = this.generateFileInfo();
		} else {
			this._html = this.generateLinkEmbed();
		}
		return BaseWidget.prototype.getHTML.call(this);
	};
}

LinkWidget.prototype = new BaseWidget();
LinkWidget.prototype.constructor = LinkWidget;