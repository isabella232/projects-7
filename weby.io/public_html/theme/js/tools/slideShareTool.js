var SlideShareTool = function (parent) {
	this._toolTag = 'slideshare';
	this._mouseIcon = 'images/slideshare.png';
	this._mouseText = 'Click to insert a Slideshare presentation';
	this._tooltipText = 'Embed a Slideshare presentation';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new SlideShareWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}

	this.toolEraserActivated = function(){
		$('.slideshare-widget').each(function(index, widget){
			var overlay = $('<div class="overlay"></div>')
				.css('height', $(this).height())
				.css('width', $(this).width());
			$(widget).prepend(overlay);
		});
	}

	this.toolEraserDeactivated = function(){
		$('.slideshare-widget .overlay').remove();
	}
}

SlideShareTool.prototype = new BaseTool();
SlideShareTool.prototype.constructor = SlideShareTool;