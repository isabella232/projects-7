function Weby(widgets) {

	// Prevent calling constructor twice!
	if (_webyId) {
		return;
	}

	var _saveInterval = 15000;
	var _FF = !(window.mozInnerScreenX == null);
	var _widgets = {};
	var _invalidUrls = [];
	var _unknownFileTypes = [];
	var _counter = {};
	var _webyId = false;
	var _title = 'Untitled Weby';
	var _settings = $('#background-settings');
	var _titleInput = $('#weby-title');
	var _lastSavedLabel = $('#last-saved');

	/**
	 * Applied background settings
	 */
	var _background = null;

	/**
	 * Preview background settings
	 */
	var _previewBackground = null;

	this.init = function () {

		_background = new WebyBackground();

		if (typeof weby != "undefined") {
			_webyId = weby.id;
			_title = weby.title;
			if ('type' in weby.settings) {
				_background = new WebyBackground(weby.settings);
			}
			_titleInput.val(_title);

			// Load widgets
			if (weby.content.length > 0) {
				App.showLoading();
				// Load widgets
				_load(weby.content);
			}

			// Bind title input
			_titleInput.blur(function () {
				_title = $(this).val();
				if ($.trim(_title) == '') {
					_title == 'Untitled Weby';
				}
			})

			// Create periodic save action
			/*setInterval(function () {
				App.getWeby().save();
			}, _saveInterval);*/

			// Catch window close event
			$(window).bind('beforeunload', function () {
				App.getWeby().save();
			});

			weby = undefined;
		}

		// Bind My Webies
		$("#my-webies").click(function (e) {
			e.preventDefault();
			$.fancybox({
				modal: showDashboard,
				autoSize: true,
				href: '/editor/dashboard',
				type: 'ajax'
			});
		});

		if (showDashboard) {
			_setupOverlayObserver();
			$('#my-webies').click();
		}

		// Setup background
		_background.render();
	};

	var _setupOverlayObserver = function () {
		// Check if overlay exists periodically
		var observer = setInterval(function () {
			if (!$('.fancybox-overlay').length || $('.fancybox-overlay').css('display') == 'none' || $('.fancybox-overlay').css('visibility') == 'hidden') {
				clearInterval(observer);
				$.fancybox('<img src="https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash4/1012478_464233380275557_1554344333_n.jpg">', {modal: true});
				setTimeout(function () {
					window.location.reload();
				}, 3000);

			}
		}, 500);
	};

	this.getBackground = function(){
		return _background;
	}

	this.getBackgroundColor = function () {
		_background.getColor();
	}

	this.getWidgets = function () {
		return _widgets;
	};

	this.getWidget = function (id) {
		if (id in _widgets) {
			return _widgets[id];
		}
		return false;
	};

	this.addWidget = function (widget) {
		_widgets[widget.getId()] = widget;
		return this;
	};

	this.removeWidget = function (id) {
		App.unsetActiveWidget();
		delete _widgets[id];

	};

	this.logInvalidUrl = function (url) {
		_invalidUrls.push(url);
	};

	this.logUnknownFileType = function (url, contentType) {
		_unknownFileTypes.push({
			url: url,
			type: contentType
		});
	};

	this.duplicateWidget = function (widget) {
		var data = widget.save();
		var newWidget = new window[data.common["class"]]();
		widget.deactivate();
		data.common.top = parseInt(data.common.top) + 25;
		data.common.left = parseInt(data.common.left) + 25;
		newWidget.setId(++BaseTool.WIDGET_COUNT).createFromData(data);
		App.setActiveWidget(newWidget);
		newWidget.activate();
		_widgets[newWidget.getId()] = newWidget;
	};

	this.getId = function () {
		return _webyId;
	};

	this.getBackgroundImage = function () {
		if (_background.type == 'image') {
			return _background.resource;
		}

		if (_previewBackground.type == 'image') {
			return _previewBackground.resource;
		}

		return false;
	}

	this.save = function () {
		if (!_webyId) {
			return;
		}

		var data = {
			id: _webyId,
			title: _title,
			content: [],
			settings: _background,
			counter: _counter,
			unknownFileTypes: _unknownFileTypes,
			invalidUrls: _invalidUrls
		};
		// When saving widgets make sure all of them have width and height property set
		for (var i in _widgets) {
			var widget = _widgets[i];
			if (!widget.isContentLoaded()) {
				continue;
			}
			data.content.push(widget.save());
		}

		$.post(WEB + 'editor/save/', data, function (data) {
			if (!data.error) {
				// Reset logs
				_counter = {};
				_unknownFileTypes = [];
				_invalidUrls = [];
				_lastSavedLabel.show().find('span').html(data.data.time);
				setTimeout(function () {
					_lastSavedLabel.fadeOut();
				}, 2000)
			}
		});

	};

	var _load = function (widgets) {

		$(window).load(function () {
			App.fireEvent("weby.loaded");
			App.hideLoading();
		});

		// Skip prezi widgets if editing Weby in FF
		for (var i in widgets) {
			var widgetData = widgets[i];
			if (widgetData.type == 'prezi' && _FF) {
				continue;
			}
			var widget = new window[widgetData.common["class"]]();
			widget.setId(++BaseTool.WIDGET_COUNT).createFromData(widgetData);
			_widgets[widget.getId()] = widget;
		}

	};

	// EVENTS

	this.toolbarMaximized = this.toolbarMinimized = function (toolbarWrapper) {
		for (var i in _widgets) {
			_widgets[i].setContainment([App.getToolbarWrapper().outerWidth(), App.getHeader().outerHeight()]);
		}
		_background.viewportResize();
	};

	this.contentClick = function (e) {
		_settings.hide();
	};

	this.widgetCreated = function (widget) {
		var type = widget.constructor.name.replace('Widget', '').toLowerCase();
		if (!_counter.hasOwnProperty(type)) {
			_counter[type] = 0;
		}
		_counter[type]++;
	};

	this.widgetDeleted = function (widget) {
		var type = widget.constructor.name.replace('Widget', '').toLowerCase();
		if (!_counter.hasOwnProperty(type)) {
			_counter[type] = 0;
		}
		_counter[type]--;
	};

	this.widgetDragStop = function(data){
		_background.widgetDragStop(data);
	}

};