function WebyBackground(settings) {

	var _canvasType = 'auto';
	var _canvasWidth = 0;
	var _canvasHeight = 0;

	var _backgrounds = {
		color: new WebyColorBackground(),
		pattern: new WebyPatternBackground(),
		image: new WebyImageBackground(),
		video: new WebyVideoBackground()
	};

	if(typeof settings != "undefined"){
		for(var i in _backgrounds){
			_backgrounds[i].populate(settings[i]);
		}
		_canvasType = settings.canvasType;
		_canvasHeight = parseInt(settings.canvasHeight);
		_canvasWidth = parseInt(settings.canvasWidth);
	}

	this.save = function(){
		var data = {};
		for(var i in _backgrounds){
			data[i] = _backgrounds[i].save();
		}
		data.canvasType = _canvasType;
		data.canvasWidth = _canvasWidth;
		data.canvasHeight = _canvasHeight;
		return data;
	}

	this.setBackgroundSize = function(width, height){
		_canvasWidth = width;
		_canvasHeight = height;

		$('#weby-background').css({
			width: width + 'px',
			height: height + 'px'
		});
	}

	/**
	 * Set canvas type: auto | fixed
	 */
	this.setCanvasType = function(type){
		_canvasType = type;
		return this;
	}

	/**
	 * Get canvas type: auto | fixed
	 */
	this.getCanvasType = function(){
		return _canvasType;
	}

	this.setImage = function(image){
		_backgrounds.image.setImage(image);
		if(_backgrounds.image.getMode() != 'aligned'){
			_backgrounds.pattern.setPattern(null);
		}
		_backgrounds.video.setVideo(null);
		return this;
	}

	this.setImageMode = function(mode){
		if(mode != 'aligned'){
			_backgrounds.pattern.setPattern(null);
		}
		_backgrounds.image.setMode(mode);
		return this;
	}

	this.setImageAlign = function(align){
		_backgrounds.image.setAlign(align);
		return this;
	}

	this.setColor = function(color){
		_backgrounds.color.setColor(color);
		_backgrounds.pattern.setPattern(null);
		_backgrounds.video.setVideo(null);
		return this;
	}

	this.getColor = function(){
		return _backgrounds.color.getColor();
	}

	this.setPattern = function(pattern){
		_backgrounds.pattern.setPattern(pattern);
		_backgrounds.color.setColor(null);
		_backgrounds.video.setVideo(null);
		return this;
	}

	this.setVideo = function(video){
		_backgrounds.video.setVideo(video);
		_backgrounds.image.setImage(null);
		_backgrounds.pattern.setPattern(null);
		_backgrounds.color.setColor(null);
		return this;
	}

	this.render = function(){
		for(var i in _backgrounds){
			_backgrounds[i].render();
		}
		this.applyCanvasSize(_canvasWidth, _canvasHeight);
	}

	this.applyCanvasSize = function (width, height) {

		// @TODO: detect widgets outside the new canvas size

		// Set image size
		App.getWeby().getBackground().setBackgroundSize(width, height);

		if (width == '' || height == '') {
			$('#canvas-width').val('');
			$('#canvas-height').val('');
			App.resizeContentHeight().resizeContentWidth().getWeby().setContainment([120, 60]);
			this.setCanvasType('auto');
			return;
		}

		this.setCanvasType('fixed').setContentSize(width, height).setContainment(width, height);

		// Size limiter
		$('#size-limit').remove();
		var div = $('<div id="size-limit"></div>');
		div.css({
			position: 'absolute',
			left: width  + 'px',
			top: height + 'px',
			'background-color': 'transparent',
			width: '1px',
			height: '1px'
		});
		App.getContent().append(div);
	};

	/**
	 * Set App content size (calculates scrollbars)
	 * @param width
	 * @param height
	 */
	this.setContentSize = function(width, height){
		if (width <= App.getContent().width()) {
			App.getContent().width(width + App.getWeby().getScrollBarOffset());
		} else {
			App.resizeContentWidth();
		}

		if (height <= App.getContent().height()) {
			App.getContent().height(height + App.getWeby().getScrollBarOffset());
		} else {
			App.resizeContentHeight();
		}
		return this;
	}

	/**
	 * Set widget containment
	 * @param width
	 * @param height
	 */
	this.setContainment = function(width, height){
		var containment = [
			parseInt(App.getContent().css("left")),
			parseInt(App.getContent().css("top")),
			width,
			height
		];

		// Trigger viewportResize to recalculate all background related elements
		App.getWeby().setContainment(containment).getBackground().viewportResize();
		return this;
	}

	/**
	 * EVENTS
	 */

	this.widgetDrag = function(){
		_backgrounds.image.widgetDrag();
	}

	this.widgetDragStop = function(){
		_backgrounds.image.widgetDragStop();
	}

	this.viewportResize = function () {
		_backgrounds.video.resize();
	};
}