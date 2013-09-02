function WebyBackground(settings) {

	var _canvasHeight = parseInt(settings.canvasHeight);
	var _canvasWidth = parseInt(settings.canvasWidth);

	var _backgrounds = {
		color: new WebyColorBackground(App.getContent()),
		pattern: new WebyPatternBackground(App.getContent(), 'purty_wood.png'),
		image: new WebyImageBackground(),
		video: new WebyVideoBackground()
	};

	for (var i in _backgrounds) {
		_backgrounds[i].populate(settings[i]);
	}

	this.setBackgroundSize = function (width, height) {
		_canvasWidth = width;
		_canvasHeight = height;

		$('#weby-background').css({
			width: width + 'px',
			height: height + 'px'
		});
	}

	this.getImage = function () {
		return _backgrounds.image.getImage();
	}

	this.render = function () {
		for (var i in _backgrounds) {
			_backgrounds[i].render();
		}
		this.applyCanvasSize(_canvasWidth, _canvasHeight);
	}

	/**
	 * Apply given canvas size
	 * @param width
	 * @param height
	 * @param type change|spin
	 */
	this.applyCanvasSize = function (width, height, type) {
		this.setContentSize(width, height, type).setBackgroundSize(width, height);
	};

	/**
	 * Set App content size (calculates scrollbars)
	 * @param width
	 * @param height
	 * @param type change|spin
	 */
	this.setContentSize = function (width, height, type) {
		function _resize(el, dimension, size, duration) {
			if (typeof duration == "undefined") {
				duration = 500;
			}
			if(type == 'spin'){
				duration = 0;
			}
			var data = {};
			data[dimension] = size;
			el.animate(data, {duration: duration, queue: false});
		}

		if (width <= App.getViewportWidth() - App.getWeby().getScrollBarOffset()) {
			_resize(App.getContent(), "width", width + 'px');
			_resize(App.getContentWrapper(), "width", width + App.getWeby().getScrollBarOffset() + 'px');
			App.getContentBackground().width(width);
		} else {
			_resize(App.getContent(), "width", width + 'px');
			_resize(App.getContentWrapper(), "width", App.getViewportWidth() + 'px');
		}

		if (height <= App.getViewportHeight() - App.getHeader().height()) {
			_resize(App.getContent(), "height", height + 'px');
			_resize(App.getContentWrapper(), "height", height + App.getWeby().getScrollBarOffset() + 'px');
			App.getContentBackground().height(height);
		} else {
			_resize(App.getContent(), "height", height + 'px');
			_resize(App.getContentWrapper(), "height", App.getViewportHeight() - App.getTopOffset() + 'px');
		}

		return this;
	}

	this.recalculateContentSize = function(){
		this.setContentSize(_canvasWidth, _canvasHeight, 'change');
	}

	this.viewportResize = function () {
		_backgrounds.video.resize();
	};
}