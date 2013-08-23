var FlickerTool = function (parent) {
	this._toolTag = 'flicker';
	this._mouseText = '{action} to insert a Flickr photo';
	this._tooltipText = 'Flickr';
	this._parent = parent;
	this._widgetClass = 'FlickerWidget';
	this._parserClass = 'FlickerParser';
}

FlickerTool.prototype = new BaseTool();
FlickerTool.prototype.constructor = FlickerTool;