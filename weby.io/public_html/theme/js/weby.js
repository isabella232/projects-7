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
	var _player = null;
	var _titleInput = $('#weby-title');
	var _lastSavedLabel = $('#last-saved');

	/**
	 * Applied background settings
	 */
	var _background = {};

	/**
	 * Preview background settings
	 */
	var _previewBackground = {};

	var _setupWeby = function () {

		if (typeof weby != "undefined") {
			_webyId = weby.id;
			_title = weby.title;
			if ('type' in weby.settings) {
				_background = weby.settings;
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
		_setBackground(_background);
	};

	var _setBackground = function (settings) {

		if (settings.type == 'pattern') {
			App.getContent().css({
				'background-image': 'url(' + THEME + 'images/patterns/' + settings.resource + '?t='+new Date().getTime()+')',
				'background-color': 'transparent',
				'background-repeat': 'repeat'
			});
		} else if (settings.type == 'color') {
			App.getContent().css({
				'background-image': 'none',
				'background-color': settings.resource
			});
		} else if (settings.type == 'youtube') {
			App.getContent().css({
				'background-image': 'none',
				'background-color': 'transparent'
			});
			_loadYoutubeBackground(settings);
		} else if (settings.type == 'image') {
			App.getContent().css({
				'background-image': 'url(' + settings.resource + '?t='+new Date().getTime()+')',
				'background-color': 'transparent'
			});

			if(settings.position == 'fixed'){
				App.getContent().removeClass('bg-repeat bg-scale').addClass('bg-fixed');
			} else if(settings.position == 'scale') {
				App.getContent().removeClass('bg-repeat bg-fixed').addClass('bg-scale');
			} else if(settings.position == 'repeat') {
				App.getContent().removeClass('bg-fixed bg-scale').addClass('bg-repeat');
			}

		}
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

	_loadYoutubeBackground = function (settings) {
		if (_player == null) {
			_player = new YT.Player('player', {
				width: App.getContent().width(),
				height: App.getContent().height(),
				videoId: settings.resource,
				playerVars: {
					controls: 0,
					showinfo: 0,
					modestbranding: 1,
					wmode: 'transparent'
				},
				events: {
					onReady: function (e) {
						e.target.playVideo();
						e.target.mute();
					}
				}
			});
		} else {
			_player.loadVideoById(settings.resource);
		}
	};

	this.getBackgroundColor = function () {
		if (_background.type == 'color') {
			return _background.resource;
		}
		return '#ffffff';
	}

	this.previewBackgroundSettings = function (settings) {
		if (_player != null && settings.type != 'youtube') {
			_player = null;
			App.getContentBackground().html('<div id="player"></div>');
		}
		_previewBackground = settings;
		_setBackground(settings);
		return this;
	};

	this.restoreBackgroundSettings = function () {
		if (_background != _previewBackground) {
			_setBackground(_background);
		}
		_settings.hide();
	};

	this.resetBackgroundSettings = function () {
		_background = {
			type: 'pattern',
			resource: 'purty_wood.png',
			position: ''
		};
		_setBackground(_background);
	}

	this.applyBackgroundSettings = function (closeSettings) {
		if(typeof closeSettings == "undefined"){
			closeSettings = true;
		}

		if(_previewBackground.hasOwnProperty('resource')){
			_background = _previewBackground;
		}
		if(closeSettings){
			_settings.hide();
		}
	};

	this.getBackgroundSettings = function () {
		return _background;
	};

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
			counter: _counter
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
				// Reset widget counter
				_counter = {};
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

		// Resize player
		if (_player != null) {
			$('#player').css({
				width: App.getContent().width(),
				left: App.getContent().css('left')
			});
		}
	};

	this.contentClick = function (e) {
		this.applyBackgroundSettings();
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

	this.viewportResize = function () {
		// Resize player
		if (_player != null) {
			$('#player').css({
				width: App.getContent().width(),
				height: App.getContent().height()
			});
		}
	};

	this.resetBackgroundSettings();

	_setupWeby();
};