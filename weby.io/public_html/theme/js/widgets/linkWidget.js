function LinkWidget() {

	this._url;
	// File data
	this._fileName;
	this._contentType;
	this._contentSize;
	this._fileHost;

	// Link data
	this._title;
	this._description;
	this._imageUrl;

	this._widgetClass = 'link-widget';
	this._isResizable = false;
	this._parseErrorMessage = "Looks like this link doesn't exist or is not supported! Try a different URL.";
	this._loadingMessage = "Loading your website...";

	this._resizableOptions = {
		minHeight: 100,
		minWidth: 200,
		resize: function () {
			var $this = $(this).data('widget');
			var _widget = $this._html;
			_widget.find('.link-widget-image').width(_widget.width()).height(_widget.height() - 5);
		}
	};

	this.getHTML = function () {
		this._html = this.generateInputField('');
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onActivate = function () {

	}

	this.onWidgetInserted = function () {

		BaseWidget.prototype.onWidgetInserted.call(this);

		// hide resize handle because we don't want to be able to resize eg. newly created widget
		this.hideResizeHandle();

		// Binds link parsing on blur of input filed
		this._inputFieldBind();

		// Bind event on Dropbox button
		this._bindDropBoxChooser();

		// Bind event on Google Drive button
		this._bindGoogleDriveChooser();


		// Focus on newly created widget (default input field)
		this._html.find("input.link-widget-field").focus();

		App.deactivateTool();

	};


	// This binds (URL based) data retrival to default input field of file widget
	this._inputFieldBind = function () {
		var $this = this;
		// Getting links
		this.input().bind("blur keydown", function (e) {
			// If key was pressed
			if (e.type == "keydown" && e.keyCode == 13) {
				return this.blur();
			} else if (e.type == "keydown") {
				return;
			}

			if ($.trim($this.input().val()) == '') {
				return;
			}

			var url = $.trim($this.input().val());

			$this.message().html('');
			$this.showLoading('Let\'s see what we have here...', 'Validating your URL may take a few moments, please be patient.');
			$this._html.find('.link-input').hide();

			$this.checkUrl(url, function (r) {
				if (!r.urlExists || typeof LinkTool.ALLOWED_TYPES[r.data['contentType']] == 'undefined') {
					$this.showError();
				}

				// Save data in properties of widget
				$this._url = url;
				$this._fileHost = r.data['fileHost'];
				$this._fileName = r.data['fileName'];
				$this._contentType = r.data['contentType'];
				$this._contentSize = r.data['contentLength'];


				// If requested file is a html page
				if ($this._contentType == 'text/html') {
					$this.showLoading();
					$.get(WEB + 'link/parse/?url=' + encodeURIComponent(url), function (data) {
						if (!data.error) {
							$this._title = data.data.title;
							$this._description = data.data.description;
							$this._imageUrl = data.data.imageUrl;
							$this.body().html($this.generateLinkEmbed());
							$this._isContentLoaded = true;
						} else {
							$this.showError();
						}
					});
				} else {
					// Render file widget
					var content = $this['generate' + LinkTool.ALLOWED_TYPES[$this._contentType].tpl]();
					$this.body().html(content);
					$this._isContentLoaded = true;
				}
			});
		});
	};

	this.showError = function () {
		this.hideLoading();
		this.message().html(this._parseErrorMessage);
		this._html.find('.link-input').show();
		this.input().val('');
		if (this._isActive) {
			this.input().focus();
		}
	}

// This binds Google Drive Chooser app initialization on click of its button
	this._bindGoogleDriveChooser = function () {
		var $this = this;
		$this.body().on('click', 'span.gdrive-button', function () {
			var picker = new google.picker.PickerBuilder().
				addView(google.picker.ViewId.DOCS).
				setCallback(function (data) {
					if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
						var doc = data[google.picker.Response.DOCUMENTS][0];
						// Prepare data for template
						$this._url = doc.url;
						$this._fileHost = 'drive.google.com';
						$this._fileName = doc.name;
						$this._contentType = 'gdrive';
						$this._contentSize = 0;

						var content = $this.generateFileInfo();
						$this.body().html(content);
					}
				}
			).build();
			picker.setVisible(true);
			$('.picker.modal-dialog-bg').css('z-index', 1000001);
			$('.picker.modal-dialog.picker-dialog').css('z-index', 1000001);
		});
	};

// This binds dropBox Chooser app initialization on click of its button
	this._bindDropBoxChooser = function () {
		var $this = this;
		$this.body().on('click', 'span.dropbox-button', function () {
			Dropbox.choose({
				success: function (files) {
					// Prepare data for template
					$this._url = files[0].link;
					$this._host = 'dropbox.com';
					$this._fileName = files[0].name;
					$this._contentType = 'dropbox';
					$this._contentSize = App.formatFileSize(files[0].bytes);

					var content = $this.generateFileInfo();
					$this.body().html(content);
				},
				// Gives us direct links to uploaded files
				linkType: "direct"
			});
		});

	};

// Generates basic input field for links which users will paste
	this.generateInputField = function (value) {
		var tpl = $('script#link-widget-field-tpl').html();
		tpl = tpl.replace('{id}', this._id);
		tpl = tpl.replace('{value}', value);
		return tpl;
	};

// Methods for generating content for various link types (eg. jpg, gif, ppt, xls ...)
// For every filetype, you can specify it's template (in LinkTool.ALLOWED_TYPES object)

// Renders standard file information box
	this.generateFileInfo = function () {
		var tpl = $('script#link-widget-file-tpl').html();
		tpl = tpl.replace('{url}', this._url);
		tpl = tpl.replace('{extension}', LinkTool.ALLOWED_TYPES[this._contentType]['extension']);
		tpl = tpl.replace('{baseName}', this._fileName);
		tpl = tpl.replace('{type}', LinkTool.ALLOWED_TYPES[this._contentType]['fileType']);
		tpl = tpl.replace('{size}', App.formatFileSize(this._contentSize));
		tpl = tpl.replace('{host}', this._fileHost);
		return tpl;
	};

// This will render web link template
	this.generateLinkEmbed = function () {
		this._verifyUrl();
		var tpl = $('script#link-widget-link-tpl').html();
		tpl = tpl.replace(/{url}/g, this._url);
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
		var tpl = $('script#link-widget-image-tpl').html();
		return tpl.replace('{url}', this._url);
	};

	this._verifyUrl = function () {
		var check = ['http://', 'https://', 'ftp://']

		for (var i in check) {
			if (this._url.indexOf(check[i]) == 0) {
				return;
			}
		}
		this._url = 'http://' + this._url;
	};

	BaseWidget.prototype.init.call(this);
}

LinkWidget.prototype = new BaseWidget();
LinkWidget.prototype.constructor = LinkWidget;