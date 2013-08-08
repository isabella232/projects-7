var AppClass = function () {
	var _content = $('#content');
	var _header = $('#header');
	var _appToolbar;
	var _toolbarWrapper = $('#toolbar-wrapper');
	var _widgets = {};
	var _viewportHeight;
	var _viewportWidth;
	var _activeWidget = null
	// Manual height offset for tweaking purposes
	var _heightOffset = 1;
	// Manual width offset for tweaking purposes
	var _widthOffset = 7;

	shortcut.add('Ctrl+V', function (e) {

	}, {propagate: true});

	$(window).keydown(function (e) {
		if (e.keyCode == 46) {
			if (_activeWidget != null && !_activeWidget._isEditable) {
				_activeWidget.delete();
			}
		}
	});

	this.init = function () {
		_appToolbar = new AppToolbar();
		_appToolbar.init();

		// Bind events
		_content.click(function (e) {
			App.fireEvent("content.click", e);
		});

		// Widget is clicked
		$('#content').on('click', '.widget', function (e) {
			App.fireEvent("widget.click", e);
		});

		// Widget is double clicked
		$('#content').on('dblclick', '.widget', function (e) {
			App.fireEvent("widget.dblclick", e);
		});

		$(window).resize(function () {
			_viewportWidth = $(window).width();
			_viewportHeight = $(window).height();
			_content.width(_viewportWidth - _toolbarWrapper.width() - _widthOffset);
			_content.height(_viewportHeight - _header.height() - _heightOffset);
			_toolbarWrapper.height(_viewportHeight - _header.height() - _heightOffset);
		}).resize();

		_content.dragOn({
			cursor: 'default'
		});
		// Make sure dragging is ON
		App.getContent().trigger("DragOn.turnOn");

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
		if ('offsetX' in data) { // This is to verify it's a mouse event
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

		if(_activeWidget != null && event in _activeWidget){
			_activeWidget[event](data);
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

	this.getWidget = function (id) {
		if(id in _widgets){
			return _widgets[id];
		}
		return false;
	}

	this.addWidget = function (widget) {
		_widgets[widget.getId()] = widget;
		return this;
	}

	this.removeWidget = function (id) {
		_activeWidget = null;
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

	this.getMaxDistance = function () {
		if (Object.keys(_widgets).length == 0) {
			return {top: 0, left: 0}
		}

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

		return {top: farBottom(), left: farRight()};
	}

	// EVENTS //
	this.widgetDragStart = function (data) {
		this.addContentOverlay();
		App.getContent().trigger("DragOn.turnOff");
	}

	this.widgetDragStop = function (data) {
		App.getContent().trigger("DragOn.turnOn");
		this.removeContentOverlay();
	}

	this.widgetRotateStart = function (data) {
		this.addContentOverlay();
		App.getContent().trigger("DragOn.turnOff");
	}

	this.widgetRotateStop = function (data) {
		App.getContent().trigger("DragOn.turnOn");
		this.removeContentOverlay();
	}

	this.widgetResizeStart = function () {
		this.addContentOverlay();
		App.getContent().trigger("DragOn.turnOff");
	}

	this.widgetResize = function (data) {
		_activeWidget.resize();
	}

	this.widgetResizeStop = function (data) {
		App.getContent().trigger("DragOn.turnOn");
		this.removeContentOverlay();
	}

	this.contentClick = function (data) {
		// Deactivate active widget
		if (_activeWidget != null) {
			$(':focus').blur();
			_activeWidget.deactivate();
			_activeWidget = null;
		}
	}

	this.widgetClick = function (e) {
		e.stopPropagation();
		// Activate clicked widget
		var id = $(e.target).closest('.widget').attr('data-id');
		if (_activeWidget != null && _activeWidget.getId() != id) {
			$(':focus').blur();
			_activeWidget.deactivate();
		}
		_activeWidget = _widgets[id];
		_activeWidget.activate();
	}

	this.widgetDblclick = function (e) {
		e.stopPropagation();
		_activeWidget.makeEditable();
	}
}