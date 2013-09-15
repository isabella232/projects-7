var WebyTool = function (parent) {
	this._toolTag = 'weby';
	this._mouseText = '{action} to insert a Weby';
	this._tooltipText = 'Weby';
	this._parent = parent;
	this._widgetClass = 'WebyWidget';
	this._parserClass = 'WebyParser';
}

WebyTool.prototype = new BaseTool();
WebyTool.prototype.constructor = WebyTool;