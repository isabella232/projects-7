var SkyDriveTool = function (parent) {
	this._toolTag = 'skydrive';
	this._mouseIcon = 'images/skydrive.png';
	this._mouseText = 'Click to insert a SkyDrive file';
	this._tooltipText = 'SkyDrive';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new SkyDriveWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

SkyDriveTool.prototype = new BaseTool();
SkyDriveTool.prototype.constructor = SkyDriveTool;