var Weby = function (widgets) {

	if(typeof widgets != "undefined"){
		// Load widgets and skip prezi widgets if FF
	}

	var _FF = !(window.mozInnerScreenX == null);
	var _widgets = {};
	var _invalidUrls = [];

	this.getWidgets = function () {
		return _widgets;
	}

	this.getWidget = function (id) {
		if (id in _widgets) {
			return _widgets[id];
		}
		return false;
	}

	this.addWidget = function (widget) {
		_widgets[widget.getId()] = widget;
		return this;
	}

	this.removeWidget = function (id) {
		_activeWidget = null;
		delete _widgets[id];

	}

	this.logInvalidUrl = function(url) {
		_invalidUrls.push(url);
	}

	// EVENTS
	/**
	 * Event: toolbar.maximized, toolbar.minimized
	 * @type {Function}
	 */
	this.toolbarMaximized = this.toolbarMinimized = function (toolbarWrapper) {
		for (var i in _widgets) {
			_widgets[i].setContainment([App.getToolbarWrapper().outerWidth(), App.getHeader().outerHeight()]);
		}
	}
}