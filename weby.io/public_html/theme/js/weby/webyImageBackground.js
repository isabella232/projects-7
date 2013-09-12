function WebyImageBackground() {

	var _image = null;
	var _mode = 'aligned';
	var _align = 'top left';

	this.setImage = function (image) {
		_image = image;
		return this;
	}

	this.getImage = function () {
		return _image;
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

		//$('#weby-background').css("background-position", _align);
		return this;
	}

	this.getAlign = function() {
		return _align;
	}

	this.populate = function (data) {
		_image = data.image == "" ? null : data.image;
		_align = data.align;
		_mode = data.mode;
		return this;
	}

	this.render = function () {
		if (_image == null) {
			$('#weby-background').remove();
			return;
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
		}
	}

	this.save = function () {
		return {
			image: _image,
			mode: _mode,
			align: _align
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
		/*App.getContent().css({
			'background-image': 'url(' + _image + ')',
			'background-size': 'cover',
			'background-attachment': 'fixed'
		});*/
		var img = $('<div id="weby-background"></div>');
		img.css({
			'background-image': 'url(' + _image + ')',
			'background-size': 'cover',
			'background-attachment': 'fixed'
		});
		App.getContent().prepend(img);
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
