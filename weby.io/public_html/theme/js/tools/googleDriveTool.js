var GoogleDriveTool = function (parent) {
	this._toolTag = 'googledrive';
	this._mouseIcon = 'images/googledrive.png';
	this._mouseText = 'Click to insert a GoogleDrive file';
	this._tooltipText = 'GoogleDrive';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new GoogleDriveWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

GoogleDriveTool.prototype = new BaseTool();
GoogleDriveTool.prototype.constructor = GoogleDriveTool;