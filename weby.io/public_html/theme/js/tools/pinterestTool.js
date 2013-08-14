var PinterestTool = function (parent) {
	this._toolTag = 'pinterest';
	this._mouseText = '{action} to insert a Pin';
	this._tooltipText = 'Pinterest';
	this._parent = parent;
	this._widgetClass = 'PinterestWidget';
	this._parserClass = 'PinterestParser';
}

PinterestTool.prototype = new BaseTool();
PinterestTool.prototype.constructor = PinterestTool;