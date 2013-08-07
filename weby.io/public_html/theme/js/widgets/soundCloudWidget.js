function SoundCloudWidget() {

	this._widgetClass = 'soundcloud-widget';

	this._resizableOptions = {
		minHeight: 166,
		maxHeight: 166,
		minWidth:250,
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
		this._html = '<textarea type="text" placeholder="Paste a SoundCloud embed code">'+test+'</textarea>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		var $this = this;

		BaseWidget.prototype.onWidgetInserted.call(this);

		this.hideResizeHandle();

		this._html.find('textarea').blur(function () {
			if ($(this).val() != '') {
				var iframe = $this.parseSoundCloudLink($(this).val())

				if (!iframe) {
					$this._html.find('.message').html('We couldn\'t insert your file. Please try a different one.');
					$(this).val('').focus();
					return;
				}

				$(this).replaceWith(iframe);
				// Append LOADING screen (move to BaseWidget)
				$this._html.find('.widget-body').prepend('<div class="loading">Loading your SoundCloud file...</div>');
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

	this.parseSoundCloudLink = function (link) {
		var original = link;
		var width = 300;
		var height = 166;
		if (link.indexOf('iframe') >= 0) {
			var regex = /src=['|"](.*?)['|"]/;
			link = original.match(regex) ? RegExp.$1 : false;
			link = link.replace('auto_play=true', 'auto_play=false')
		} else {
			return false;
		}

		var id = 'soundcloud-iframe-' + this._id;
		this._html.resizable("option", "alsoResize", "#" + id);
		return '<iframe id="' + id + '" src="' + link + '" width="' + width + '" height="' + height + '" scrolling="no" frameborder="0"></iframe>';
	}

	BaseWidget.prototype.init.call(this);

	var test = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F70703171&amp;color=ff0000&amp;auto_play=true&amp;show_artwork=false"></iframe>';
}

SoundCloudWidget.prototype = new BaseWidget();
SoundCloudWidget.prototype.constructor = SoundCloudWidget;