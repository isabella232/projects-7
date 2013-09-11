var AppToolbar = function () {
	var _FF = !(window.mozInnerScreenX == null);
	var self = this;
	var _activeTool = null;
	var _toolBar = $('<div id="toolbar"><ul></ul></div>')
	var _toolbarWrapper = $("#toolbar-wrapper");
	var _tools = {};

	this.init = function () {
		_tools = {
			text: new TextTool(self),
			link: new LinkTool(self),
			map: new MapTool(self),
			instagram: new InstagramTool(self),
			pinterest: new PinterestTool(self),
			facebook: new FacebookTool(self),
			twitter: new TwitterTool(self),
			linkedin: new LinkedInTool(self),
			video: new VideoTool(self),
			slideshare: new SlideShareTool(self),
			googledrive: new GoogleDriveTool(self),
			skydrive: new SkyDriveTool(self),
			soundcloud: new SoundCloudTool(self),
			vine: new VineTool(self),
			flicker: new FlickerTool(self)
		}
		_mainTools = ['text', 'link', 'map', 'instagram', 'pinterest', 'facebook', 'twitter', 'linkedin'];
		_otherTools = ['video', 'slideshare', 'googledrive', 'skydrive', 'soundcloud', 'vine', 'flicker'];

		if (_FF) {
			delete _tools.prezi;
		}

		/**
		 * Build main toolbar
		 */
		for(var key in _mainTools) {
			var object = _tools[_mainTools[key]];
			object.init();
			_toolBar.find('ul').append(object.getToolbarIcon());
		}

		_toolBar.find('ul').append('<li class="tools-drop-arrow"><a data-tool="tools-drop" class="tool-icon tools-drop ui-draggable" title="Other">OtherTools</a><ul></ul></li>');

		/**
		 * Build secondary toolbar
		 */
		for(var key in _otherTools) {
			object = _tools[_otherTools[key]];
			object.init();
			_toolBar.find('ul li ul').append(object.getToolbarIcon());
		}

		_toolbarWrapper.append(_toolBar);

		_makeToolsDraggable();

		/**
		 * Toolbar clicked
		 */
		_toolBar.find('a.tool-icon').closest('li').click(function (e) {
			App.fireEvent("tool.icon.clicked", e);
			e.stopPropagation();
			var toolType = $(this).find('a.tool-icon').attr('data-tool');
			if (_activeTool == null) {
				_activateTool(toolType);
			} else {
				if (_activeTool == toolType) {
					_deactivateTool();
				} else {
					_activateTool(toolType);
				}
			}

		});
	}

	/**
	 * Get toolbar jQuery object
	 */
	this.getElement = function () {
		return _toolBar;
	}

	/**
	 * Get active tool object
	 * @returns BaseTool
	 */
	this.getActiveTool = function () {
		if (_activeTool == null) {
			return null;
		}
		return _tools[_activeTool];
	}

	/**
	 * Get hash (object) of all tool instances
	 */
	this.getAllTools = function () {
		return _tools;
	}

	/**
	 * Activate given tool
	 * @param tool Tool tag
	 * @param action Specifies activation action: click|drag (`click` by default)
	 */
	var _activateTool = function (tool, action) {
		if (_activeTool != null) {
			_deactivateTool();
		}
		_activeTool = tool;
		self.getActiveTool().activate(action);
	}

	/**
	 * Deactivate currently active tool
	 */
	var _deactivateTool = function () {
		if (_activeTool == null) {
			return;
		}
		self.getActiveTool().deactivate();
		_activeTool = null;
	}

	/**
	 * Deactivate currently active tool
	 * @type {Function}
	 */
	this.deactivateTool = _deactivateTool;

	/**
	 * Handle drag&drop of tools into the main content
	 * @private
	 */
	var _makeToolsDraggable = function () {
		// Draggable tools
		var drag = _toolBar.find('a.tool-icon').draggable({
			helper: "clone",
			containment: [117, 72],
			start: function (event, ui) {
				ui.helper.hide();
				var tool = $(this).attr('data-tool');
				$(this).data('tool', tool);
				drag.draggable('option', 'revert', false);
				_activateTool(tool, 'drag');
			},
			stop: function (event, ui) {
				var tool = $(this).data('tool');
				_deactivateTool(tool);
				if (drag.draggable('option', 'revert')) {
					return;
				}
				var activeTool = _tools[tool];

				// Make sure the drop was made inside the workspace
				if ((event.clientX - _toolBar.outerWidth()) < 1 || event.clientY - $('#header').outerHeight() < 1) {
					return;
				}

				var x = event.clientX - App.getLeftOffset() + App.getContentWrapper()[0].scrollLeft;
				var y = event.clientY - App.getTopOffset() + App.getContentWrapper()[0].scrollTop;
				activeTool.createWidgetAt(x, y);
			}
		});

		$(document).keydown(function (e) {
			if (e.keyCode == 27) {
				drag.draggable('option', 'revert', true).trigger('mouseup');

				if (_activeTool != null) {
					_deactivateTool();
				}
			}
		});
	}
}

