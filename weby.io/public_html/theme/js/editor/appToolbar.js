var AppToolbar = function () {
	var _FF = !(window.mozInnerScreenX == null);
	var self = this;
	var _activeTool = null;
	var _toolBar = $('<div id="toolbar"></div>')
	var _toolbarWrapper = $("#toolbar-wrapper");
	var _tools = {};

	this.init = function () {
		_tools = {
			text: new TextTool(self),
			link: new LinkTool(self),
			video: new VideoTool(self),
			map: new MapTool(self),
			instagram: new InstagramTool(self),
			pinterest: new PinterestTool(self),
			facebook: new FacebookTool(self),
			prezi: new PreziTool(self),
			slideshare: new SlideShareTool(self),
			googledrive: new GoogleDriveTool(self),
			skydrive: new SkyDriveTool(self),
			soundcloud: new SoundCloudTool(self),
			linkedin: new LinkedInTool(self),
			twitter: new TwitterTool(self),
			vine: new VineTool(self),
			flicker: new FlickerTool(self)
		};

		if(_FF){
			delete _tools.prezi;
		}

		/**
		 * Build toolbar
		 */
		$.each(_tools, function (index, object) {
			object.init();
			_toolBar.append(object.getToolbarIcon());
		});

		_toolbarWrapper.append(_toolBar);

		_makeToolsDraggable();

		/**
		 * Toolbar clicked
		 */
		_toolBar.find('a.tool-icon').click(function (e) {
			App.fireEvent("tool.icon.clicked", e);
			e.stopPropagation();
			var toolType = $(this).attr('data-tool');
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

				var x = event.clientX - _toolBar.outerWidth() + App.getContent()[0].scrollLeft;
				var y = event.clientY - $('#header').outerHeight() + App.getContent()[0].scrollTop;
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

