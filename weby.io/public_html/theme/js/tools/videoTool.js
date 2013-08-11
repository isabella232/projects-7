var VideoTool = function (parent) {
	this._toolTag = 'video';
	this._mouseIcon = 'images/video.png';
	this._mouseText = '{action} to insert video';
	this._tooltipText = 'Video';
	this._parent = parent;
	this._widgetClass = 'VideoWidget';
	this._parserClass = 'VideoParser';
}

VideoTool.prototype = new BaseTool();
VideoTool.prototype.constructor = VideoTool;