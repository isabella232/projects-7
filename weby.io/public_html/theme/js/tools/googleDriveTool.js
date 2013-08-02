var GoogleDriveTool = function (parent) {
	this._toolTag = 'googledrive';
	this._mouseIcon = 'images/googledrive.png';
	this._mouseText = 'Click to insert a GoogleDrive file';
	this._tooltipText = 'Embed a GoogleDrive file';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new GoogleDriveWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}

	this.toolEraserActivated = function(){
		$('.googledrive-widget').each(function(index, widget){
			var overlay = $('<div class="overlay"></div>')
				.css('height', $(this).height())
				.css('width', $(this).width());
			$(widget).prepend(overlay);
		});
	}

	this.toolEraserDeactivated = function(){
		$('.googledrive-widget .overlay').remove();
	}
}

GoogleDriveTool.prototype = new BaseTool();
GoogleDriveTool.prototype.constructor = GoogleDriveTool;