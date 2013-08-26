function WebyColorBackground() {

	var _color = null;

	this.setColor = function (color) {
		_color = color;
	}

	this.getColor = function () {
		return _color;
	}

	this.render = function () {
		if (_color != null) {
			App.getContent().css({
				'background-color': _color,
				'background-image': 'none'
			});
		}
	}
}