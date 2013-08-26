function WebyBackground() {

	var _backgrounds = {
		color: new WebyColorBackground(),
		pattern: new WebyPatternBackground(),
		image: new WebyImageBackground(),
		video: new WebyVideoBackground()
	};
	
	this.setImage = function(image){
		_backgrounds.image.setImage(image);
		if(_backgrounds.image.getMode() != 'no-repeat'){
			_backgrounds.pattern.setPattern(null);
		}
		return this;
	}

	this.setImageMode = function(mode){
		if(mode != 'no-repeat'){
			_backgrounds.pattern.setPattern(null);
		}
		_backgrounds.image.setMode(mode);
		return this;
	}

	this.setImageSize = function(width, height){
		_backgrounds.image.setWidth(width).setHeight(height);
		return this;
	}

	this.setImageAlign = function(align){
		_backgrounds.image.setAlign(align);
		return this;
	}

	this.setColor = function(color){
		_backgrounds.color.setColor(color);
		_backgrounds.pattern.setPattern(null);
		_backgrounds.image.setImage(null);
		return this;
	}

	this.getColor = function(){
		return _backgrounds.color.getColor();
	}

	this.setPattern = function(pattern){
		_backgrounds.pattern.setPattern(pattern);
		_backgrounds.color.setColor(null);
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