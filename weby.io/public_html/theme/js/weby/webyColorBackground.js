function WebyColorBackground(el) {

	var _el = el;
	var _color = null;

	this.setColor = function (color) {
		_color = color;
		return this;
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
			_el.css({backgroundColor: _color});
		}
	}

	this.save = function(){
		return {
			color: _color
		}
	}

	this.webyBackgroundBeforeResize = function(){
		_el.hide();
	}

	this.webyBackgroundResized = function () {
		_el.show();
		_el.css({
			width: App.getContent().width()+'px',
			height: App.getContent().height()+'px'
		});
	}
}