function WebyImageBackground() {

	var _image = null;
	var _mode = 'no-repeat';
	var _align = 'top left';
	var _width = 0;
	var _height = 0;

	this.setImage = function (image) {
		_image = image;
		return this;
	}

	this.setMode = function (mode) {
		_mode = mode;
		return this;
	}

	this.getMode = function () {
		return _mode;
	}

	this.setAlign = function (align) {
		_align = align;
		$('#weby-background').css("background-position", _align);
		return this;
	}

	this.setWidth = function (width) {
		_width = width;
		return this;
	}

	this.setHeight = function (height) {
		_height = height;
		return this;
	}

	this.render = function () {
		if (_image == null) {
			$('#weby-background').remove();
		}

		if (_mode == 'no-repeat') {
			_renderNoRepeat();
			$('#background-settings-align').show();
		} else if (_mode == 'repeat') {
			_renderRepeat();
			$('#background-settings-align').hide();
		} else if (_mode == 'fixed') {
			_renderFixed();
			$('#background-settings-align').hide();
		} else if (_mode == 'scale') {
			_renderScale();
			$('#background-settings-align').hide();
		}
	}

	var _renderNoRepeat = function () {
		$('#weby-background').remove();
		var img = $('<div id="weby-background" ></div>');
		img.css({
			'background-image': 'url('+_image+')',
			'background-position': _align == null ? 'left top' : _align,
			width: _width + 'px',
			height: _height + 'px',
			top: 0,
			left: 0,
			position: 'absolute'
		});
		App.getContent().prepend(img);
	}

	var _renderRepeat = function () {
		$('#weby-background').remove();
		var img = $('<div id="weby-background"></div>');
		img.css({
			'background-image': 'url(' + _image + ')',
			'background-repeat': 'repeat',
			width: App.getContent().width() + 20 + 'px',
			height: App.getContent().height() + 20 + 'px'
		});
		App.getContent().prepend(img);
	}

	var _renderFixed = function () {
		$('#weby-background').remove();
		App.getContent().css({
			'background-image': 'url(' + _image + ')',
			'background-size': 'cover',
			'background-attachment': 'fixed'
		});
	}

	var _renderScale = function () {
		$('#weby-background').remove();
		var img = $('<img id="weby-background" src="' + _image + '"/>');
		img.css({
			width: App.getContent().width() + 18 + 'px',
			height: App.getContent().height() + 18 + 'px'
		});
		App.getContent().prepend(img);
	}

	/**
	 * EVENTS
	 */
	this.widgetDrag = function () {
		if (_mode == 'scale' || _mode == 'repeat') {
			var content = App.getContent()[0];
			$('#weby-background').height(0).width(0).css({
				height: content.scrollHeight + 'px',
				width: content.scrollWidth + 'px'
			});
		}
	}

	this.widgetDragStop = function (data) {
		// Nothing...
	}
}