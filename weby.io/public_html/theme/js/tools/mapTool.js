var MapTool = function (parent) {
	this._toolTag = 'map';
	this._mouseIcon = 'images/map.png';
	this._mouseText = '{action} to insert a Google Map';
	this._tooltipText = 'Google Map';
	this._parent = parent;
	this._widgetClass = 'MapWidget';
}

MapTool.prototype = new BaseTool();
MapTool.prototype.constructor = MapTool;