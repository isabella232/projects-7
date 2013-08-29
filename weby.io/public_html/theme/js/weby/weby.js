function Weby() {

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
	var _webyToolbar = null;
	var _title = 'Untitled Weby';
	var _settings = $('#background-settings');
	var _titleInput = $('#weby-title');
	var _lastSavedLabel = $('#last-saved');

	/**
	 * Content background
	 */
	var _background = null;

	/**
	 * Document background
	 */
	var _documentBackground = null;

	this.init = function () {

		if (typeof weby != "undefined") {
			_webyId = weby.id;
			_title = weby.title;
			if ('color' in weby.settings) {
				_background = new WebyBackground(weby.settings);
				_documentBackground = new WebyDocumentBackground(weby.settings);
			} else {
				_background = new WebyBackground();
				_documentBackground = new WebyDocumentBackground();
			}

			_webyToolbar = new WebyToolbar();
			_titleInput.val(_title);

			// Load widgets
			if (weby.content.length > 0) {
				App.showLoading();
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
			setInterval(function () {
				App.getWeby().save();
			}, _saveInterval);

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
		_documentBackground.render();


	};

	/**
	 * Returns a scrollbar width depending on browser
	 */
	this.getScrollBarOffset = function(){
		if(_FF){
			return 18;
		}
		return 7;
	}

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

	this.getDocumentBackground = function(){
		return _documentBackground;
	}

	this.getToolbar = function(){
		return _webyToolbar;
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

	this.save = function () {
		if (!_webyId) {
			return;
		}

		var settings = _background.save();
		settings['document'] = _documentBackground.save();

		var data = {
			id: _webyId,
			title: _title,
			content: [],
			settings: settings,
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

	this.setContainment = function(containment){
		for (var i in _widgets) {
			_widgets[i].setContainment(containment);
		}
		return this;
	}

	var _load = function (widgets) {

		if(widgets == ''){
			return;
		}

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

	this.widgetActivated = function(widget){
		_webyToolbar.widgetActivated(widget);
	}

	this.toolbarMaximized = this.toolbarMinimized = function (toolbarWrapper) {
		for (var i in _widgets) {
			_widgets[i].setContainment([App.getToolbarWrapper().outerWidth(), App.getHeader().outerHeight()]);
		}
		_background.viewportResize();
	};

	this.contentClick = function (e) {
		_settings.hide();
	};


	this.widgetActivated = function(widget){
		_webyToolbar.widgetActivated(widget);
	}

	this.widgetDeactivated = function(widget){
		_webyToolbar.widgetDeactivated(widget);
	}

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
