var SlideShareTool = function (parent) {
	this._toolTag = 'slideshare';
	this._mouseIcon = 'images/slideshare.png';
	this._mouseText = 'Click to insert a Slideshare presentation';
	this._tooltipText = 'Slideshare';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new SlideShareWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

SlideShareTool.prototype = new BaseTool();
SlideShareTool.prototype.constructor = SlideShareTool;