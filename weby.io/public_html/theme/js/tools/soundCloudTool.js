var SoundCloudTool = function (parent) {
	this._toolTag = 'soundcloud';
	this._mouseIcon = 'images/soundcloud.png';
	this._mouseText = 'Click to insert a SoundCloud file';
	this._tooltipText = 'SoundCloud';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new SoundCloudWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

SoundCloudTool.prototype = new BaseTool();
SoundCloudTool.prototype.constructor = SoundCloudTool;