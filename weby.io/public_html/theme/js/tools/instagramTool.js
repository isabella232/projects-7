var InstagramTool = function (parent) {
	this._toolTag = 'instagram';
	this._mouseIcon = 'images/instagram.png';
	this._mouseText = '{action} to insert an Instagram file';
	this._tooltipText = 'Instagram';
	this._parent = parent;
	this._widgetClass = 'InstagramWidget';
	this._parserClass = 'InstagramParser';
}

InstagramTool.prototype = new BaseTool();
InstagramTool.prototype.constructor = InstagramTool;