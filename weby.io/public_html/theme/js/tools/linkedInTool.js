var LinkedInTool = function (parent) {
	this._toolTag = 'linkedin';
	this._mouseIcon = 'images/linkedin.png';
	this._mouseText = 'Click to insert a LinkedIn member profile';
	this._tooltipText = 'Embed a LinkedIn member profile';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new LinkedInWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}

	this.toolEraserActivated = function(){
		$('.linkedin-widget').each(function(index, widget){
			var overlay = $('<div class="overlay"></div>')
				.css('height', $(this).height())
				.css('width', $(this).width());
			$(widget).prepend(overlay);
		});
	}

	this.toolEraserDeactivated = function(){
		$('.linkedin-widget .overlay').remove();
	}
}

LinkedInTool.prototype = new BaseTool();
LinkedInTool.prototype.constructor = LinkedInTool;