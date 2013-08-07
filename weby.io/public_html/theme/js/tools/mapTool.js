var MapTool = function (parent) {
	this._toolTag = 'map';
	this._mouseIcon = 'images/map.png';
	this._mouseText = 'Click to insert a Google Map';
	this._tooltipText = 'Google Map';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new MapWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

MapTool.prototype = new BaseTool();
MapTool.prototype.constructor = MapTool;