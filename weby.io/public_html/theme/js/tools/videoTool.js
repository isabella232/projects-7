var VideoTool = function (parent) {
	this._toolTag = 'video';
	this._mouseIcon = 'images/video.png';
	this._mouseText = 'Click to insert video';
	this._tooltipText = 'Video';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new VideoWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

VideoTool.prototype = new BaseTool();
VideoTool.prototype.constructor = VideoTool;