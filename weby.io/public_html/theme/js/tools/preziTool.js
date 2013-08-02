var PreziTool = function (parent) {
	this._toolTag = 'prezi';
	this._mouseIcon = 'images/prezi.png';
	this._mouseText = 'Click to insert a Prezi presentation';
	this._tooltipText = 'Embed a Prezi presentation';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new PreziWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}

	this.toolEraserActivated = function(){
		$('.prezi-widget').each(function(index, widget){
			var overlay = $('<div class="overlay"></div>')
				.css('height', $(this).height())
				.css('width', $(this).width());
			$(widget).prepend(overlay);
		});
	}

	this.toolEraserDeactivated = function(){
		$('.prezi-widget .overlay').remove();
	}
}

PreziTool.prototype = new BaseTool();
PreziTool.prototype.constructor = PreziTool;