function WebyColorBackground(el) {

	var _el = el;
	var _color = null;

	this.setColor = function (color) {
		_color = color;
	}

	this.getColor = function () {
		return _color;
	}

	this.populate = function (data) {
		_color = data.color == "" ? null : data.color;
		return this;
	}

	this.render = function () {
		if (_color != null) {
			_el.css({
				'background-color': _color,
				'background-image': 'none'
			});
		}
	}

	this.save = function(){
		return {
			color: _color
		}
	}
}