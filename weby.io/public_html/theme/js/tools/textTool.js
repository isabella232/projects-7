var TextTool = function (parent) {
	this._toolTag = 'text';
	this._mouseIcon = 'images/text.png';
	this._mouseText = '{action} to create text';
	this._tooltipText = 'Text';
	this._parent = parent;
	this._widgetClass = 'TextWidget';
}

TextTool.prototype = new BaseTool();
TextTool.prototype.constructor = TextTool;