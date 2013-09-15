var GooglePlusTool = function (parent) {
	this._toolTag = 'googleplus';
	this._mouseText = '{action} to insert a Google+ post';
	this._tooltipText = 'Google+';
	this._parent = parent;
	this._widgetClass = 'GooglePlusWidget';
	this._parserClass = 'GooglePlusParser';
}

GooglePlusTool.prototype = new BaseTool();
GooglePlusTool.prototype.constructor = GooglePlusTool;