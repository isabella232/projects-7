function WebyBackground(settings) {

	var _canvasWidth = 0;
	var _canvasHeight = 0;

	var _backgrounds = {
		color: new WebyColorBackground(),
		pattern: new WebyPatternBackground(),
		image: new WebyImageBackground(),
		video: new WebyVideoBackground()
	};

	if (typeof settings != "undefined") {
		for (var i in _backgrounds) {
			_backgrounds[i].populate(settings[i]);
		}
		_canvasHeight = parseInt(settings.canvasHeight);
		_canvasWidth = parseInt(settings.canvasWidth);
	}

	this.save = function () {
		var data = {};
		for (var i in _backgrounds) {
			data[i] = _backgrounds[i].save();
		}
		data.canvasWidth = _canvasWidth;
		data.canvasHeight = _canvasHeight;
		return data;
	}

	this.setBackgroundSize = function (width, height) {
		_canvasWidth = width;
		_canvasHeight = height;

		$('#weby-background').css({
			width: width + 'px',
			height: height + 'px'
		});
	}


	this.setImage = function (image) {
		_backgrounds.image.setImage(image);
		if (_backgrounds.image.getMode() != 'aligned') {
			_backgrounds.pattern.setPattern(null);
		}
		_backgrounds.video.setVideo(null);
		return this;
	}

	this.setImageMode = function (mode) {
		if (mode != 'aligned') {
			_backgrounds.pattern.setPattern(null);
		}
		_backgrounds.image.setMode(mode);
		return this;
	}

	this.setImageAlign = function (align) {
		_backgrounds.image.setAlign(align);
		return this;
	}

	this.setColor = function (color) {
		_backgrounds.color.setColor(color);
		_backgrounds.pattern.setPattern(null);
		_backgrounds.video.setVideo(null);
		return this;
	}

	this.getColor = function () {
		return _backgrounds.color.getColor();
	}

	this.setPattern = function (pattern) {
		_backgrounds.pattern.setPattern(pattern);
		_backgrounds.color.setColor(null);
		_backgrounds.video.setVideo(null);
		return this;
	}

	this.setVideo = function (video) {
		_backgrounds.video.setVideo(video);
		_backgrounds.image.setImage(null);
		_backgrounds.pattern.setPattern(null);
		_backgrounds.color.setColor(null);
		return this;
	}

	this.render = function () {
		for (var i in _backgrounds) {
			_backgrounds[i].render();
		}
		this.applyCanvasSize(_canvasWidth, _canvasHeight);
	}

	/**
	 * Get widgets that are located outside the given width and height of the canvas
	 * @param width
	 * @param height
	 */
	var _getWidgetsBeyondCanvas = function (width, height) {
		var widgets = App.getWeby().getWidgets();
		var outerWidgets = [];
		for (var i in widgets) {
			var widget = widgets[i];
			var rect = widget.html()[0].getBoundingClientRect();
			if (rect.width + rect.left > width + App.getContentWrapper()[0].scrollLeft || rect.height + rect.top - 94 + App.getContentWrapper()[0].scrollTop > height) {
				outerWidgets.push(widget);
			}
		}

		if (outerWidgets.length == 0) {
			return false;
		}
		return outerWidgets;

	}

	/**
	 * Apply given canvas size
	 * @param width
	 * @param height
	 */
	this.applyCanvasSize = function (width, height) {
		var $this = this;

		function _applyCanvasSize(width, height) {
			$this.setContentSize(width, height).setContainment(width, height).setBackgroundSize(width, height);

			// Size limiter
			$('#size-limit').remove();
			var div = $('<div id="size-limit"></div>');
			div.css({
				position: 'absolute',
				left: width + 'px',
				top: height + 'px',
				'background-color': 'transparent',
				width: '1px',
				height: '1px'
			});
			App.getContent().append(div);
		}

		var outerWidgets = _getWidgetsBeyondCanvas(width, height);
		if (outerWidgets) {
			$('#button-move-widgets').unbind('click').click(function () {
				for (var i in outerWidgets) {
					var pos = Math.floor(Math.random() * (50 - 20 + 1) + 20);
					outerWidgets[i].setPosition(pos + App.getContentWrapper()[0].scrollLeft, pos + App.getContentWrapper()[0].scrollTop);
				}
				$.fancybox.close();
				_applyCanvasSize(width, height);
			});
			$('#button-dont-move-widgets').unbind('click').click(function () {
				$.fancybox.close();
				App.getWeby().getToolbar().restorePreviousCanvasSize();
				return;
			});
			$.fancybox($('#outer-widgets'), {modal: true});
		} else {
			_applyCanvasSize(width, height);
		}
	};

	/**
	 * Set App content size (calculates scrollbars)
	 * @param width
	 * @param height
	 */
	this.setContentSize = function (width, height) {
		App.getWeby().getToolbar().setCanvasSize(width, height);
		if (width <= App.getViewportWidth() - App.getWeby().getScrollBarOffset()) {
			App.getContentWrapper().width(width + App.getWeby().getScrollBarOffset());
			App.getContentBackground().width(width);
		} else {
			App.getContentWrapper().width(App.getViewportWidth());
		}

		if (height <= App.getViewportHeight() - App.getHeader().height()) {
			App.getContentWrapper().height(height + App.getWeby().getScrollBarOffset());
			App.getContentBackground().height(height);
		} else {
			App.getContentWrapper().height(App.getViewportHeight() - 94);
		}

		App.getContent().width(width).height(height);
		return this;
	}

	/**
	 * Set widget containment
	 * @param width
	 * @param height
	 */
	this.setContainment = function (width, height) {
		if (!width && !height) {
			var containment = [0, 94];
		} else {
			var containment = [0, 94, width, height];
		}

		BaseWidget.CONTAINMENT = containment;
		// Trigger viewportResize to recalculate all background related elements
		App.getWeby().setContainment(containment).getBackground().viewportResize();
		return this;
	}

	/**
	 * EVENTS
	 */

	this.widgetDrag = function () {
		_backgrounds.image.widgetDrag();
	}

	this.widgetDragStop = function () {
		_backgrounds.image.widgetDragStop();
	}

	this.viewportResize = function () {
		_backgrounds.video.resize();
	};
}