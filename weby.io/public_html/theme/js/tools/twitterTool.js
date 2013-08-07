var TwitterTool = function (parent) {
	this._toolTag = 'twitter';
	this._mouseIcon = 'images/twitter.png';
	this._mouseText = 'Click to embed a tweet';
	this._tooltipText = 'Tweet';
	this._parent = parent;

	this.contentClick = function (e) {
		BaseTool.prototype.contentClick.call(this, e);
		var widget = new TwitterWidget();
		this.insertWidgetAt(widget, e.offsetX, e.offsetY);
	}
}

TwitterTool.prototype = new BaseTool();
TwitterTool.prototype.constructor = TwitterTool;