var SoundCloudTool = function (parent) {
	this._toolTag = 'soundcloud';
	this._mouseIcon = 'images/soundcloud.png';
	this._mouseText = 'Click to insert a SoundCloud file';
	this._tooltipText = 'Embed a SoundCloud file';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new SoundCloudWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}

	this.toolEraserActivated = function(){
		$('.soundcloud-widget').each(function(index, widget){
			var overlay = $('<div class="overlay"></div>')
				.css('height', $(this).height())
				.css('width', $(this).width());
			$(widget).prepend(overlay);
		});
	}

	this.toolEraserDeactivated = function(){
		$('.soundcloud-widget .overlay').remove();
	}
}

SoundCloudTool.prototype = new BaseTool();
SoundCloudTool.prototype.constructor = SoundCloudTool;