var TwitterTool = function (parent) {
	this._toolTag = 'twitter';
	this._mouseIcon = 'images/twitter.png';
	this._mouseText = 'Click to embed a tweet';
	this._tooltipText = 'Embed a Tweet';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new TwitterWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}

	this.toolEraserActivated = function(){
		$('.twitter-widget').each(function(index, widget){
			var overlay = $('<div class="overlay"></div>')
				.css('height', $(this).height())
				.css('width', $(this).width());
			$(widget).prepend(overlay);
		});
	}

	this.toolEraserDeactivated = function(){
		$('.twitter-widget .overlay').remove();
	}
}

TwitterTool.prototype = new BaseTool();
TwitterTool.prototype.constructor = TwitterTool;