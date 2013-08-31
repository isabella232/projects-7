var GoogleDriveTool = function (parent) {
	this._toolTag = 'googledrive';
	this._mouseIcon = 'images/googledrive.png';
	this._mouseText = '{action} to insert a GoogleDrive file';
	this._tooltipText = 'GoogleDrive';
	this._parent = parent;
	this._widgetClass = 'GoogleDriveWidget';
	this._parserClass = 'GoogleDriveParser';
}

GoogleDriveTool.prototype = new BaseTool();
GoogleDriveTool.prototype.constructor = GoogleDriveTool;