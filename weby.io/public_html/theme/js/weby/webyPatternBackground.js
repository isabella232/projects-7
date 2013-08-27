function WebyPatternBackground() {

	var _pattern = 'purty_wood.png';

	this.setPattern = function (pattern) {
		_pattern = pattern;
	}

	this.populate = function (data) {
		_pattern = data.pattern == "" ? null : data.pattern;
		return this;
	}

	this.render = function () {
		if (_pattern == null) {
			return App.getContent().css({
				'background-image': 'none'
			});
		}

		App.getContent().css({
			'background-image': 'url(' + THEME + 'images/patterns/' + _pattern + ')',
			'background-color': 'transparent',
			'background-repeat': 'repeat',
			'background-size': ''
		});
	}

	this.save = function(){
		return {
			pattern: _pattern
		}
	}
}
