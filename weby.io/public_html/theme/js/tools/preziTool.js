var PreziTool = function (parent) {
	this._toolTag = 'prezi';
	this._mouseIcon = 'images/prezi.png';
	this._mouseText = 'Click to insert a Prezi presentation';
	this._tooltipText = 'Prezi';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new PreziWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

PreziTool.prototype = new BaseTool();
PreziTool.prototype.constructor = PreziTool;