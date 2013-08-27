function WebyImageBackground() {

	var _image = null;
	var _mode = 'aligned';
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

	this.populate = function (data) {
		_image = data.image == "" ? null : data.image;
		_align = data.align;
		_mode = data.mode;
		_width = data.width;
		_height = data.height;
		return this;
	}

	this.render = function () {
		if (_image == null) {
			$('#weby-background').remove();
		}

		if (_mode == 'aligned') {
			_renderAligned();
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
		} else if (_mode == 'limit') {
			_renderLimit();
			$('#background-settings-align').hide();
		}
	}

	this.save = function () {
		return {
			image: _image,
			mode: _mode,
			align: _align,
			width: _width,
			height: _height
		}
	}

	var _renderAligned = function () {
		$('#weby-background').remove();
		var img = $('<div id="weby-background"></div>');
		img.css({
			'background-image': 'url(' + _image + ')',
			'background-position': _align == null ? 'left top' : _align,
			'background-repeat': 'no-repeat',
			width: App.getContent()[0].scrollWidth + 'px',
			height: App.getContent()[0].scrollHeight + 'px',
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

	var _renderLimit = function () {
		$('#weby-background').remove();
		var img = $('<img id="weby-background" src="' + _image + '"/>');
		img.css({
			width: _width + 'px',
			height: _height + 'px'
		});
		App.getContent().prepend(img);
	}

	/**
	 * EVENTS
	 */
	this.widgetDrag = function () {
		if (_mode != 'fixed' && _mode != 'limit') {
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
