var AppClass = function () {
	var _content = $('#content');
	var _contentWrapper = $('#wrapper');
	var _contentBackground = $('#content-background');
	var _header = $('#header');
	var _dashboard = null;
	var _weby = false;
	var _webyDrag;
	var _viewportHeight;
	var _viewportWidth;
	var _topOffset = 60;
	var _bottomOffset = 0;


	/**
	 * Application bootstrap
	 */
	this.init = function () {

		$('body').mousemove(function (e) {
			App.fireEvent("document.mouse.move", e);
		});

		_content.bind({
			mouseleave: function () {
				_webyDrag.stopDrag();
			},
			mousemove: function (e) {
				_webyDrag.contentMouseMove(e);
			},
			mouseup: function (e) {
				$('body').removeClass('unselectable');
				_webyDrag.contentMouseUp(e);
			},
			mousedown: function (e) {
				$('body').addClass('unselectable');
				e.originalEvent.preventDefault();
				_webyDrag.contentMouseDown(e);
			},
			// Webkit mousewheel
			mousewheel: function (e) {
				_webyDrag.contentMouseWheel(e);
			},
			// Firefox mousewheel
			DOMMouseScroll: function (e) {
				_webyDrag.contentMouseWheel(e);
			},
			// TOUCH events
			touchstart: function (e) {
				$('body').addClass('unselectable');
				_webyDrag.contentMouseDown(e);
			},
			touchmove: function (e) {
				_webyDrag.contentMouseMove(e);
			},
			touchend: function (e) {
				$('body').removeClass('unselectable');
				_webyDrag.contentMouseUp(e);
			}
		});


		_content.on('mousedown', '.widget', function (e) {
			e.stopPropagation();
		});


		// Recalculate editor dimensions when window is resized
		$(window).resize(function () {
			_viewportWidth = $(window).width();
			_viewportHeight = $(window).height();
			App.getWeby().getBackground().recalculateContentSize();
			App.fireEvent("viewport.resize");
		});

		// Setup initial content sizes
		_viewportWidth = $(window).width();
		_viewportHeight = $(window).height();
		_contentWrapper.width(_viewportWidth);
		_contentWrapper.height(_viewportHeight - _topOffset);
		_contentBackground.width(_viewportWidth);
		_contentBackground.height(_viewportHeight - _topOffset);

		// Setup dragging and Weby
		_webyDrag = new WebyDrag(_content);
		_weby = new Weby();
		_weby.init();
	}

	this.showLoading = function () {
		var margin = $(window).height() / 2 - 50;
		$('body').append('<div id="app-loading"><span style="top: ' + margin + 'px">Loading your Weby...</span></div>');
	}

	this.hideLoading = function () {
		$('#app-loading').fadeOut('slow', function () {
			$(this).remove();
		});
	}

	/**
	 * Get current Weby
	 * @returns Weby
	 */
	this.getWeby = function () {
		return _weby;
	}

	/**
	 * Returns current viewport height
	 */
	this.getViewportHeight = function () {
		return _viewportHeight;
	}

	this.getAvailableContentWidth = function () {
		return _viewportWidth - _weby.getScrollBarOffset();
	}

	this.getAvailableContentHeight = function () {
		return _viewportHeight - _topOffset - _bottomOffset - _weby.getScrollBarOffset();
	}

	this.getTopOffset = function () {
		return _topOffset;
	}

	this.getBottomOffset = function () {
		return _bottomOffset;
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
	 * Get jQuery content wrapper element
	 */
	this.getContentWrapper = function () {
		return _contentWrapper;
	}

	/**
	 * Get jQuery content background element
	 */
	this.getContentBackground = function () {
		return _contentBackground;
	}

	/**
	 * Get header jQuery object
	 */
	this.getHeader = function () {
		return _header;
	}

	this.getDashboard = function () {
		return _dashboard;
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
		if (data && 'offsetX' in data) { // This is to verify it's a mouse event
			data = MouseEvent.normalize(data);
		}

		// Construct event method name
		var parts = event.split('.');
		for (var i in parts) {
			var part = parts[i];
			if (i == 0) {
				event = part;
			} else {
				event += part.charAt(0).toUpperCase() + part.slice(1);
			}
		}

		// Propagate event to App class
		if (event in this) {
			this[event](data);
		}

		// Propagate event to Weby
		if (_weby && event in _weby) {
			_weby[event](data);
		}
	}

	/**
	 * Format file size
	 * @param number Number in bytes
	 */
	this.formatFileSize = function (number) {
		if (!number || typeof number == "undefined" || number == 0) {
			return 'N/A';
		}
		number = parseInt(number)

		function formatNumber(num) {
			var size = ['bytes', 'KB', 'MB', 'GB'];
			for (var i in size) {
				if (num < 1024.0) {
					return parseFloat(Math.round(num * 100) / 100).toFixed(2) + ' ' + size[i];
				}
				num /= 1024.0
			}
			return parseFloat(Math.round(num * 100) / 100).toFixed(2) + ' TB';
		}

		return formatNumber(number);
	}
}