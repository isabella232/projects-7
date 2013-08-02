var AppClass = function () {
	var _content = $('#content');
	var _header = $('#header');
	var _appToolbar;
	var _widgets = {};
	var _viewportHeight;
	var _viewportWidth;

	shortcut.add('Ctrl+V', function (e) {

	}, {propagate: true});

	this.init = function () {
		_appToolbar = new AppToolbar();
		_appToolbar.init();

		// Bind events

		_content.click(function (e) {
			App.fireEvent("content.click", e);
		});

		$(window).resize(function () {
			_viewportWidth = $(window).width();
			_viewportHeight = $(window).height();
			_content.width(_viewportWidth);
			_content.height(_viewportHeight - 75);
		}).resize();
	}

	this.getViewportHeight = function () {
		return _viewportHeight;
	}

	this.getViewportWidth = function () {
		return _viewportWidth;
	}

	this.getContent = function () {
		return _content;
	}

	this.fireEvent = function (event, data, all) {
		// Make sure mouse event has 'offsetX' and 'offsetY' set (for Firefox)
		if('offsetX' in data){
			data = MouseEvent.normalize(data);
		}
		//tool = typeof tool == "undefined" ? null : tool;
		all = typeof all == "undefined" ? false : true;

		var parts = event.split('.');
		$.each(parts, function (i, part) {
			if (i == 0) {
				event = part;
			} else {
				event += part.charAt(0).toUpperCase() + part.slice(1);
			}
		});

		if (event in this) {
			this[event](data);
		}

		if (all) {
			var tools = _appToolbar.getAllTools()
			$.each(tools, function (i, tool) {
				if (event in tool) {
					tool[event](data);
				}
			});
		} else {
			var activeTool = _appToolbar.getActiveTool();
			if (activeTool != null && event in activeTool) {
				_appToolbar.getActiveTool()[event](data);
			}
		}
	}

	this.getWidgets = function () {
		return _widgets;
	}

	this.addWidget = function (widget) {
		_widgets[widget.getId()] = widget;
		return this;
	}

	this.removeWidget = function (id) {
		var widget = _widgets[id];
		widget.delete();
		delete _widgets[id];
	}

	this.deactivateTool = function () {
		_appToolbar.deactivateTool();
	}

	this.getActiveTool = function () {
		return _appToolbar.getActiveTool();
	}

	this.addContentOverlay = function () {
		App.getContent().prepend($('<div id="content-overlay"></div>'));
	}

	this.removeContentOverlay = function () {
		$('#content-overlay').remove();
	}

	// EVENTS //

	this.widgetDrag = function (data) {
		this._resizeContent(data.element);
	}

	this.widgetResizeStart = this.widgetDragStart = this.widgetRotateStart = function (data) {
		this.addContentOverlay();
	}

	this.widgetDragStop = this.widgetRotateStop = function (data) {
		this.removeContentOverlay();
		this._resizeContent(data.element);
	}

	this.widgetResizeStop = function (data) {
		this.removeContentOverlay();

		this._resizeContent(data.element);
	}

	this._resizeContent = function ($this) {
		var farRight = function () {
			var element;
			var max = 0;
			$('.widget').each(function () {
				var z = parseInt($(this).css('left').replace('px', ''), 10);
				if (max < z) {
					element = $(this);
					max = z;
				}
			});
			return max + element.width();
		}

		var farBottom = function () {
			var element;
			var max = 0;
			$('.widget').each(function () {
				var z = parseInt($(this).css('top').replace('px', ''), 10);
				if (max < z) {
					element = $(this);
					max = z;
				}
			});
			return max + element.height();
		}

		// $this is an element which triggered recalculation
		try {
			var right = farRight();
		} catch (e) {
			var right = this.getViewportWidth();
		}

		try {
			var bottom = farBottom();
		} catch (e) {
			var bottom = this.getViewportHeight();
		}

		if (right + 100 > _content.width()) {
			_content.width(right + 65);
		} else if (right < this.getViewportWidth()) {
			_content.width(this.getViewportWidth() - 17);
		} else {
			_content.width(right - 20);
		}

		if (bottom > _content.height()) {
			_content.height(bottom + 65);
		}

		if (bottom + 100 > _content.height()) {
			_content.height(bottom + 65);
		} else if (bottom < this.getViewportHeight()) {
			_content.height(this.getViewportHeight() - 17);
		} else {
			_content.height(bottom - 20);
		}
	}
}