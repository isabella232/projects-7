var LinkedInTool = function (parent) {
	this._toolTag = 'linkedin';
	this._mouseIcon = 'images/linkedin.png';
	this._mouseText = 'Click to insert a LinkedIn member profile';
	this._tooltipText = 'LinkedIn';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new LinkedInWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

LinkedInTool.prototype = new BaseTool();
LinkedInTool.prototype.constructor = LinkedInTool;