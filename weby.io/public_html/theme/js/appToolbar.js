var AppToolbar = function () {
	var self = this;
	var _activeTool = null;
	var _toolBar = $('<div id="toolbar"></div>')
	var _tools = {};

	this.init = function(){
		_tools = {
			text: new TextTool(self),
			file: new FileTool(self),
			map: new MapTool(self),
			video: new VideoTool(self),
			prezi: new PreziTool(self),
			slideshare: new SlideShareTool(self),
			googledrive: new GoogleDriveTool(self),
			skydrive: new SkyDriveTool(self),
			soundcloud: new SoundCloudTool(self),
			linkedin: new LinkedInTool(self),
			twitter: new TwitterTool(self),
			eraser: new EraserTool(self)
		};

		$.each(_tools, function (index, object) {
			object.init();
			_toolBar.append(object.getToolbarIcon());
		});

		$('#toolbar-wrapper').append(_toolBar);

		_toolBar.kendoTooltip({
			filter: "a",
			width: 120,
			position: "bottom"
		}).data("kendoTooltip");

		_toolBar.find('a.tool-icon').click(function (e) {
			App.fireEvent("tool.icon.clicked", e, true);
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

		shortcut.add('Esc', function () {
			if (_activeTool != null) {
				_deactivateTool();
			}
		});
	},

	this.getElement = function(){
		return _toolBar;
	}

	this.getActiveTool = function () {
		if (_activeTool == null) {
			return null;
		}
		return _tools[_activeTool];
	}

	this.getAllTools = function(){
		return _tools;
	}

	var _activateTool = function (tool) {
		if (_activeTool != null) {
			_deactivateTool();
		}
		_activeTool = tool;
		self.getActiveTool().activate();

		$('#toolbar-wrapper').mouseover(function (e) {
			App.fireEvent("toolbar.mouse.over", e);
		}).mouseout(function (e) {
				App.fireEvent("toolbar.mouse.out", e);
			});
	}

	var _deactivateTool = function () {
		if(_activeTool == null){
			return;
		}
		self.getActiveTool().deactivate();
		$('#toolbar-wrapper').unbind("mouseover mouseout");
		_activeTool = null;
	}

	this.deactivateTool = _deactivateTool;
}

