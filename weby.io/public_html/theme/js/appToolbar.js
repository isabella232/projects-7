var AppToolbar = function () {
	var self = this;
	var _activeTool = null;
	var _toolBar = $('<div id="toolbar"></div>')
	var _tools = {};

	this.init = function(){
		_tools = {
			text: new TextTool(self),
			map: new MapTool(self),
			video: new VideoTool(self),
			prezi: new PreziTool(self),
			slideshare: new SlideShareTool(self),
			googledrive: new GoogleDriveTool(self),
			skydrive: new SkyDriveTool(self),
			soundcloud: new SoundCloudTool(self),
			linkedin: new LinkedInTool(self),
			twitter: new TwitterTool(self)
		};

		$.each(_tools, function (index, object) {
			object.init();
			_toolBar.append(object.getToolbarIcon());
		});

		$('#toolbar-wrapper').append(_toolBar);

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
	}

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
		App.getContent().trigger('DragOn.toggle');
		self.getActiveTool().activate();
	}

	var _deactivateTool = function () {
		if(_activeTool == null){
			return;
		}
		self.getActiveTool().deactivate();
		App.getContent().trigger('DragOn.toggle');
		_activeTool = null;
	}

	this.deactivateTool = _deactivateTool;
}

