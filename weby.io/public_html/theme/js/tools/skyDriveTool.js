var SkyDriveTool = function (parent) {
	this._toolTag = 'skydrive';
	this._mouseIcon = 'images/skydrive.png';
	this._mouseText = 'Click to insert a SkyDrive file';
	this._tooltipText = 'Embed a SkyDrive file';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new SkyDriveWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}

	this.toolEraserActivated = function(){
		$('.skydrive-widget').each(function(index, widget){
			var overlay = $('<div class="overlay"></div>')
				.css('height', $(this).height())
				.css('width', $(this).width());
			$(widget).prepend(overlay);
		});
	}

	this.toolEraserDeactivated = function(){
		$('.skydrive-widget .overlay').remove();
	}
}

SkyDriveTool.prototype = new BaseTool();
SkyDriveTool.prototype.constructor = SkyDriveTool;