var Weby = function (widgets) {

	var _FF = !(window.mozInnerScreenX == null);
	var _widgets = {};
	var _invalidUrls = [];
	var _unknownFileTypes = [];

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
		App.unsetActiveWidget();
		delete _widgets[id];

	}

	this.logInvalidUrl = function(url) {
		_invalidUrls.push(url);
	}

	this.logUnknownFileType = function(url, contentType){
		_unknownFileTypes.push({
			url: url,
			type: contentType
		});
	}

	this.save = function(){
		var data = {
			widgets: []
		};
		// When saving widgets make sure all of them have width and height property set
		for(var i in _widgets){
			var widget = _widgets[i];
			if(!widget.isContentLoaded()){
				continue;
			}
			data.widgets.push(widget.save());
		}

		$.post(WEB+'editor/save/', data, function(data){
			if(!data.error){
				console.log(data.msg);
			}
		});

	}

	var _load = function(widgets){
		for (var i in widgets) {
			var widgetData = widgets[i];
			var widget = new window[widgetData.common.class]();
			widget.setId(++BaseTool.WIDGET_COUNT).createFromData(widgetData);
			_widgets[widget.getId()] = widget;
		}
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

	if(typeof webyWidgets != "undefined"){
		// Load widgets and skip prezi widgets if FF
		_load(webyWidgets);
		/*webyWidgets = undefined;
		delete webyWidgets;*/
	}
}