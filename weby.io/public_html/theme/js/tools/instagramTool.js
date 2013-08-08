var InstagramTool = function (parent) {
	this._toolTag = 'instagram';
	this._mouseIcon = 'images/instagram.png';
	this._mouseText = 'Click to insert a Instagram file';
	this._tooltipText = 'Instagram';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new InstagramWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

InstagramTool.prototype = new BaseTool();
InstagramTool.prototype.constructor = InstagramTool;