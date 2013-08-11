var SkyDriveTool = function (parent) {
	this._toolTag = 'skydrive';
	this._mouseIcon = 'images/skydrive.png';
	this._mouseText = '{action} to insert a SkyDrive file';
	this._tooltipText = 'SkyDrive';
	this._parent = parent;
	this._widgetClass = 'SkyDriveWidget';
	this._parserClass = 'SkyDriveParser';
}

SkyDriveTool.prototype = new BaseTool();
SkyDriveTool.prototype.constructor = SkyDriveTool;