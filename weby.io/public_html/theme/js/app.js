var AppClass = function () {
	var _content = $('#content');
	var _header = $('#header');
	var _appToolbar;
	var _weby = new Weby();
	var _webyDrag;
	var _toolbarWrapper = $('#toolbar-wrapper');
	var _viewportHeight;
	var _viewportWidth;
	var _activeWidget = null
	// Manual height offset for tweaking purposes
	var _heightOffset = 1;
	// Manual width offset for tweaking purposes
	var _widthOffset = 7;

	/**
	 * Catch Ctrl+V key press
	 */
	$(document).keydown(function (e) {

		if (!(e.ctrlKey && e.keyCode == 86)) {
			return;
		}

		if ($('body :focus').length > 0) {
			return;
		}
		var bucket = $('<textarea id="clipboard" style="position:absolute; top:-999999px; left: -999999px"></textarea>');
		$('body').append(bucket);
		bucket.focus();
		setTimeout(function () {
			var data = bucket.val();
			bucket.remove();
			App.contentPasted(data);
		}, 100);
	});

	/**
	 * Catch arrow keys
	 */
	$(document).keydown(function (e) {
		if (_activeWidget == null || $(':focus').length !== 0) {
			return;
		}

		var distance = 1;
		if (e.shiftKey) {
			distance = 10;
		}

		switch (e.keyCode) {
			case 37:
				_activeWidget.moveLeft(distance);
				break;
			case 38:
				_activeWidget.moveUp(distance);
				break;
			case 39:
				_activeWidget.moveRight(distance);
				break;
			case 40:
				_activeWidget.moveDown(distance);
				break;
		}

		if ($.inArray(e.keyCode, [37, 38, 39, 40])) {
			e.stopPropagation();
			e.preventDefault();
		}
	});

	/**
	 * Catch delete key press
	 */
	$(document).keydown(function (e) {
		if (e.keyCode == 46) {
			if (_activeWidget != null && _activeWidget._html.find(':focus').length === 0) {
				_activeWidget.delete();
			}
		}
	});

	/**
	 * Application bootstrap
	 */
	this.init = function () {
		_appToolbar = new AppToolbar();
		_appToolbar.init();

		// Bind events
		$(document).keydown(function (e) {
			var element = e.target.nodeName.toLowerCase();
			if (element != 'input' && element != 'textarea') {
				if (e.keyCode === 8) {
					return false;
				}
			}
		});

		$('body').mousemove(function (e) {
			App.fireEvent("document.mouse.move", e);
		});

		_content.click(function (e) {
			App.fireEvent("content.click", e);
		});

		// Widget is clicked
		_content.on('click', '.widget', function (e) {
			// If mouse was really moved (mousemove event is fired even on 'click' so it's not a reliable metric) don't click the widget
			if(App.mouseStart != e.clientX+':'+ e.clientY){
				return;
			}
			App.fireEvent("widget.click", e);
		});

		_content.on('mousedown', '.widget', function (e) {
			// Need to store some representation of current mouse position for later comparison
			App.mouseStart = e.clientX+':'+ e.clientY;
			App.fireEvent("widget.mousedown", e);
			if(_activeWidget != null){
				e.stopPropagation();
			}
		});

		// Widget is double clicked
		_content.on('dblclick', '.widget', function (e) {
			if (!$(e.target).hasClass('control')) {
				App.fireEvent("widget.dblclick", e);
			}
		});

		// These content events should be forwarded to drag object exclusively
		_content.mousemove(function (e) {
			_webyDrag.contentMouseMove(e);
		}).mouseup(function (e) {
				$('body').removeClass('unselectable');
				_webyDrag.contentMouseUp(e);
			}).mousedown(function (e) {
				$('body').addClass('unselectable');
				_webyDrag.contentMouseDown(e);
			}).mouseleave(function (e) {
				//_webyDrag.stopDrag(e);
			});

		// Recalculate editor dimensions when window is resized
		$(window).resize(function () {
			_viewportWidth = $(window).width();
			_viewportHeight = $(window).height();
			_content.width(_viewportWidth - _toolbarWrapper.width() - _widthOffset);
			_content.height(_viewportHeight - _header.height() - _heightOffset);
			_toolbarWrapper.height(_viewportHeight - _header.height());
		}).resize();

		_webyDrag = new WebyDrag(_content);
	},

	/**
	 * Get current Weby
	 * @returns Weby
	 */
	this.getWeby = function(){
		return _weby;
	},

	/**
	 * Returns current viewport height
	 */
	this.getViewportHeight = function () {
		return _viewportHeight;
	}

	/**
	 * Returns current viewport width
	 */
	this.getViewportWidth = function () {
		return _viewportWidth;
	}

	/**
	 * Get jQuery content element
	 */
	this.getContent = function () {
		return _content;
	}

	/**
	 * Get header jQuery object
	 */
	this.getHeader = function(){
		return _header;
	}

	/**
	 * Get toolbar wrapper jQuery object
	 */
	this.getToolbarWrapper = function(){
		return _toolbarWrapper;
	}

	/**
	 * Main APP event manager
	 * All events related to widgets, toolbars, clicks, moves, etc. must be routed through here!!
	 * @param event Event name in form "widget.drag.start"
	 * @param data Relevant event data (array, object, mouse event, whatever...)
	 * @param all Should this event be passed to all tools
	 */
	this.fireEvent = function (event, data) {
		// Make sure mouse event has 'offsetX' and 'offsetY' set (for Firefox)
		if ('offsetX' in data) { // This is to verify it's a mouse event
			data = MouseEvent.normalize(data);
		}

		// Construct event method name
		var parts = event.split('.');
		$.each(parts, function (i, part) {
			if (i == 0) {
				event = part;
			} else {
				event += part.charAt(0).toUpperCase() + part.slice(1);
			}
		});

		// Propagate event to App class
		if (event in this) {
			this[event](data);
		}

		// Propagate event to Weby
		if (event in _weby) {
			_weby[event](data);
		}

		// Propagate event to active widget
		if (_activeWidget != null && event in _activeWidget) {
			_activeWidget[event](data);
		}

		// Propagate event to active tool
		var activeTool = _appToolbar.getActiveTool();
		if (activeTool != null && event in activeTool) {
			_appToolbar.getActiveTool()[event](data);
		}
	}

	this.deactivateTool = function () {
		_appToolbar.deactivateTool();
	}

	this.getActiveTool = function () {
		return _appToolbar.getActiveTool();
	}

	this.setActiveWidget = function (widget) {
		if (_activeWidget != null) {
			_activeWidget.deactivate();
		}
		_activeWidget = widget;
	}

	this.addContentOverlay = function () {
		App.getContent().prepend($('<div id="content-overlay"></div>'));
	}

	this.removeContentOverlay = function () {
		$('#content-overlay').remove();
	}

	/**
	 * Format file size
	 * @param number Number in bytes
	 * @param format (Optional) Default: "%3.2f %s" (Ex: 9.60 KB)
	 */
	this.formatFileSize = function (number, format) {
		if (!number || typeof number == "undefined" || number == 0) {
			return 'N/A';
		}
		if (typeof format == "undefined") {
			format = "%3.2f %s";
		}

		number = parseInt(number)

		function formatNumber(num) {
			var size = ['bytes', 'KB', 'MB', 'GB'];
			for (var i in size) {
				if (num < 1024.0) {
					return sprintf(format, num, size[i]);
				}
				num /= 1024.0
			}
			return sprintf(format, num, 'TB');
		}

		return formatNumber(number);
	}

	// EVENTS //
	this.widgetDragStart = function (data) {
		this.addContentOverlay();
	}

	this.widgetDragStop = function (data) {
		this.removeContentOverlay();
	}

	this.widgetRotateStart = function (data) {
		this.addContentOverlay();
	}

	this.widgetRotateStop = function (data) {
		this.removeContentOverlay();
	}

	this.widgetResizeStart = function () {
		this.addContentOverlay();
	}

	this.widgetResize = function (data) {
		// Nothing
	}

	this.widgetResizeStop = function (data) {
		this.removeContentOverlay();
	}

	this.contentClick = function (data) {
		$(':focus').blur();
		// In case iframe was focused - return focus to main window
		window.focus();
		// Deactivate active widget
		if (_activeWidget != null) {
			_activeWidget.deactivate();
			_activeWidget = null;
		}
	}

	this.widgetClick = function (e) {
		// In case iframe was focused - return focus to main window
		window.focus();
		e.stopPropagation();
		// Activate clicked widget
		var id = $(e.target).closest('.widget').attr('data-id');
		if (_activeWidget != null && _activeWidget.getId() != id) {
			$(':focus').blur();
			_activeWidget.deactivate();
		}
		_activeWidget = _weby.getWidgets()[id];
		_activeWidget.activate(e);
	}

	this.widgetDblclick = function (e) {
		e.stopPropagation();
		if (_activeWidget != null) {
			_activeWidget.makeEditable();
		}
	}

	this.contentPasted = function (data) {
		var tools = _appToolbar.getAllTools();
		for (var i in tools) {
			var tool = tools[i];
			// Text and file tools are processed in the end
			if (tool.getTag() == 'text' || tool.getTag() == 'link') {
				continue;
			}
			if (tool.canHandle(data)) {
				tool.createWidgetFromParser();
				return;
			}
		}

		//Check file
		if (tools['link'].canHandle(data)) {
			return tools['link'].createWidgetFromParser();
		}

		// Insert plain text
		var textWidget = tools['text'].createWidgetAt(100, 100);
		textWidget.setData(data);
	}
}