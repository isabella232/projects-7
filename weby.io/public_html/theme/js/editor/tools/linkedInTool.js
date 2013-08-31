var LinkedInTool = function (parent) {
	this._toolTag = 'linkedin';
	this._mouseIcon = 'images/linkedin.png';
	this._mouseText = '{action} to insert a LinkedIn member profile';
	this._tooltipText = 'LinkedIn';
	this._parent = parent;
	this._widgetClass = 'LinkedInWidget';
	this._parserClass = 'LinkedInParser';
}

LinkedInTool.prototype = new BaseTool();
LinkedInTool.prototype.constructor = LinkedInTool;