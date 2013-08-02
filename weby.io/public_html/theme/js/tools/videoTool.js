var VideoTool = function (parent) {
	this._toolTag = 'video';
	this._mouseIcon = 'images/video.png';
	this._mouseText = 'Click to insert video';
	this._tooltipText = 'Embed a video from Youtube or Vimeo';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new VideoWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}

	this.toolEraserActivated = function(){
		$('.video-widget').each(function(index, widget){
			var overlay = $('<div class="overlay"></div>')
				.css('height', $(this).height())
				.css('width', $(this).width());
			$(widget).prepend(overlay);
		});
	}

	this.toolEraserDeactivated = function(){
		$('.video-widget .overlay').remove();
	}
}

VideoTool.prototype = new BaseTool();
VideoTool.prototype.constructor = VideoTool;