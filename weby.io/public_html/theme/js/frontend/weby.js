function Weby() {

	var _FF = !(window.mozInnerScreenX == null);

	/**
	 * Content background
	 */
	var _background = null;

	/**
	 * Document background
	 */
	var _documentBackground = null;

	this.init = function () {

		_background = new WebyBackground(weby.settings);
		_documentBackground = new WebyDocumentBackground(weby.settings.document);

		if (weby.content.length > 0) {
			App.showLoading();
			_load(weby.content);
		}

		// Setup background
		_background.render();
		_documentBackground.render();

	};

	/**
	 * Returns a scrollbar width depending on browser
	 */
	this.getScrollBarOffset = function () {
		if (_FF) {
			return 18;
		}
		return 7;
	}

	this.getBackground = function () {
		return _background;
	}

	this.getDocumentBackground = function () {
		return _documentBackground;
	}

	var _load = function (widgets) {

		if (widgets == '') {
			return;
		}

		$(window).load(function () {
			$('[type="weby/linkWidgetTemplate"]').remove();
			$('#initScript').remove();
			App.fireEvent("weby.loaded");
			App.hideLoading();
		});

		// Skip prezi widgets if editing Weby in FF
		for (var i in widgets) {
			var widgetData = widgets[i];
			var widget = new window[widgetData.common["class"]]();
			var html = widget.createFromData(widgetData);
			App.getContent().append(html);
			if('onWidgetInserted' in widget){
				widget.onWidgetInserted();
			}
		}
	}
};
