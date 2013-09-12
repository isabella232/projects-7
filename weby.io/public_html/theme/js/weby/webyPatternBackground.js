function WebyPatternBackground(el, defaultPattern) {

	var _el = el;
	var _pattern = defaultPattern;

	this.setPattern = function (pattern) {
		_pattern = pattern;
		return this;
	}

	this.populate = function (data) {
		_pattern = data.pattern == "" ? null : data.pattern;
		return this;
	}

	this.render = function () {
		if (_pattern == null || _pattern == 'no-pattern.png') {
			return _el.css({
				'background-image': 'none'
			});
		}

		_el.css({
			'background-image': 'url(' + THEME + 'images/patterns/' + _pattern + ')',
			'background-color': 'transparent',
			'background-repeat': 'repeat',
			'background-size': '',
			'background-attachment': 'local'
		});
	}

	this.save = function(){
		return {
			pattern: _pattern
		}
	}

	this.viewportResize = function () {
		// Need to have at least an empty method
	};
}
