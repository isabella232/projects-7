function SkyDriveWidget() {

	this._widgetClass = 'skydrive-widget';

	this._resizableOptions = {
		minWidth: 300,
		start: function (event, ui) {
			$(this).find('.widget-body').prepend('<div class="overlay"></div>');
			App.fireEvent("widget.resize.start", {element: $(this), event: event, ui: ui});
		},
		stop: function (event, ui) {
			App.fireEvent("widget.resize.stop", {element: $(this), event: event, ui: ui});
			$(this).find('.overlay').remove();
			$(this).css('height', 'auto');
		},
		resize: function (event, ui) {
			$(this).find('.overlay').css('height', $(this).height()).css('width', $(this).width());
		}
	};

	this.getHTML = function () {
		this._html = '<textarea type="text" placeholder="Paste a SkyDrive embed code"></textarea>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		var $this = this;

		BaseWidget.prototype.onWidgetInserted.call(this);

		this.hideResizeHandle();

		this._html.find('textarea').blur(function () {
			if ($(this).val() != '') {
				var iframe = $this.parseSkyDriveLink($(this).val())

				if (!iframe) {
					$this._html.find('.message').html('We couldn\'t insert your file. Please try a different one.');
					$(this).val('').focus();
					return;
				}

				$(this).replaceWith(iframe);
				// Append LOADING screen (move to BaseWidget)
				$this._html.find('.widget-body').prepend('<div class="loading">Loading your SkyDrive file...</div>');
				var loading = $this._html.find('.loading');
				loading.css('height', $this._html.height()).css('width', $this._html.width());
				var top = $this._html.height() / 2 - 20;
				loading.css("margin", top + "px auto 0 auto");
				$('#' + $(iframe).attr('id')).bind('load', function () {
					$this._html.find('.loading').remove();
				});
				//
				$this.showResizeHandle();
				$this._html.draggable($this._baseDraggableOptions);
				$this._html.find('.message').remove();
				$this._html.css('padding-bottom', 0);
				App.fireEvent("widget.resize.stop", {element: $this._html});
			}
		});

		App.deactivateTool();
		this._html.find('textarea').focus();
	};

	this.parseSkyDriveLink = function (link) {
		var original = link;
		var width = 429;
		var height = 357;
		if (link.indexOf('iframe') >= 0) {
			var regex = /src=['|"](.*?)['|"]/;
			link = original.match(regex) ? RegExp.$1 : false;
			width = original.match(/width="?(\d+)"?/) ? RegExp.$1 : width;
			height = original.match(/height="?(\d+)"?/) ? RegExp.$1 : height;
		} else {
			return false;
		}

		var id = 'skydrive-iframe-' + this._id;
		this._html.resizable("option", "alsoResize", "#" + id);
		this.setResizableAspectRatio(width / height);
		return '<iframe id="' + id + '" src="' + link + '" width="' + width + '" height="' + height + '" frameborder="0"></iframe>';
	}

	// <iframe src="http://www.slideshare.net/slideshow/embed_code/24621277?rel=0&startSlide=3" width="342" height="291" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe>
	BaseWidget.prototype.init.call(this);
}

SkyDriveWidget.prototype = new BaseWidget();
SkyDriveWidget.prototype.constructor = SkyDriveWidget;