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

		var progress = new WebyProgress($('#progress'), widgets.length, 280);
		var loaded = 0;
		var _checkLoading = function() {
			loaded++;
			progress.next();
			if (loaded == widgets.length) {
				$('[type="weby/linkWidgetTemplate"]').remove();
				App.fireEvent("weby.loaded");
				App.hideLoading();
			}
		}

		for (var i in widgets) {
			var widgetData = widgets[i];
			var widget = new window[widgetData.common["class"]]();
			var html = widget.createFromData(widgetData);

			// Bind load events
			if (html.find('.widget-body iframe').length > 0) {
				html.find('iframe').load(_checkLoading);
			} else if (html.find('.widget-body img').length > 0) {
				html.find('img').load(_checkLoading);
			} else {
				_checkLoading();
			}

			// Append to DOM
			App.getContent().append(html);
			if ('onWidgetInserted' in widget) {
				widget.onWidgetInserted();
			}
		}
	}
};
