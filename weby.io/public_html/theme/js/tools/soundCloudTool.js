var SoundCloudTool = function (parent) {
	this._toolTag = 'soundcloud';
	this._mouseIcon = 'images/soundcloud.png';
	this._mouseText = '{action} to insert a SoundCloud file';
	this._tooltipText = 'SoundCloud';
	this._parent = parent;
	this._widgetClass = 'SoundCloudWidget';
}

SoundCloudTool.prototype = new BaseTool();
SoundCloudTool.prototype.constructor = SoundCloudTool;