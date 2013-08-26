function WebyImageBackground() {

	var _image = null;
	var _mode = 'no-repeat';
	var _align = 'top left';

	this.setImage = function (image) {
		_image = image;
	}

	this.setMode = function (mode) {
		_mode = mode;
	}

	this.getMode = function () {
		return _mode;
	}

	this.setAlign = function (align) {
		_align = align;
	}

	this.render = function () {
		if (_image == null || _mode != 'no-repeat') {
			//$('#weby-background').remove();
		}

		if (_mode == 'no-repeat') {
			$('#weby-background').remove();
			var img = $('<img id="weby-background" src="' + _image + '"/>');
			App.getContent().prepend(img);
		} else if (_mode == 'repeat') {
			$('#weby-background').remove();
			var img = $('<div id="weby-background"></div>');
			img.css({
				'background-image': 'url(' + _image + ')',
				'background-repeat': 'repeat',
				width: App.getContent().width() + 20 + 'px',
				height: App.getContent().height() + 20 + 'px'
			});
			App.getContent().prepend(img);
		} else if (_mode == 'fixed') {
			$('#weby-background').remove();
			App.getContent().css({
				'background-image': 'url(' + _image + ')',
				'background-size': 'cover',
				'background-attachment': 'fixed'
			});
		} else if (_mode == 'scale') {
			$('#weby-background').remove();
			var img = $('<img id="weby-background" src="' + _image + '"/>');
			img.css({
				width: App.getContent().width() + 18 + 'px',
				height: App.getContent().height() + 18 + 'px'
			});
			App.getContent().prepend(img);
		}

		// @TODO: apply alignment
	}

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