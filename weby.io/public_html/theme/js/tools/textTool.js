var TextTool = function (parent) {
	this._toolTag = 'text';
	this._mouseIcon = 'images/text.png';
	this._mouseText = 'Click to create text';
	this._tooltipText = 'Text';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new TextWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

TextTool.prototype = new BaseTool();
TextTool.prototype.constructor = TextTool;