var SlideShareTool = function (parent) {
	this._toolTag = 'slideshare';
	this._mouseText = '{action} to insert a Slideshare presentation';
	this._tooltipText = 'Slideshare';
	this._parent = parent;
	this._widgetClass = 'SlideShareWidget';
	this._parserClass = 'SlideShareParser';
}

SlideShareTool.prototype = new BaseTool();
SlideShareTool.prototype.constructor = SlideShareTool;