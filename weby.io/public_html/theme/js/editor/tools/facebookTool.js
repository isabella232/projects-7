var FacebookTool = function (parent) {
	this._toolTag = 'facebook';
	this._mouseIcon = 'images/facebook.png';
	this._mouseText = '{action} to insert a Facebook feed';
	this._tooltipText = 'Facebook';
	this._parent = parent;
    this._parserClass = 'FacebookParser';
    this._widgetClass = 'FacebookWidget';
}

FacebookTool.prototype = new BaseTool();
FacebookTool.prototype.constructor = FacebookTool;