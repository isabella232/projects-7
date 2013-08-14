var TwitterTool = function (parent) {
	this._toolTag = 'twitter';
	this._mouseText = '{action} to embed a tweet';
	this._tooltipText = 'Tweet';
	this._parent = parent;
	this._widgetClass = 'TwitterWidget';
	this._parserClass = 'TwitterParser';
}

TwitterTool.prototype = new BaseTool();
TwitterTool.prototype.constructor = TwitterTool;