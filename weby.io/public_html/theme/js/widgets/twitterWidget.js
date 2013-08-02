function TwitterWidget() {
	this._isResizable = false;
	this._widgetClass = 'twitter-widget';

	this.init = function(){
		BaseWidget.prototype.init.call(this);
	}

	this.getHTML = function () {
		this._html = '<textarea class="tweet-embed" placeholder="Paste your tweet embed code here"></textarea>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		var $this = this;

		$this.hideResizeHandle();
		BaseWidget.prototype.onWidgetInserted.call($this);
		App.deactivateTool();
		this._html.find('.tweet-embed').blur(function(){
			$(this).replaceWith($(this).val());
		}).focus();
	}
}


TwitterWidget.prototype = new BaseWidget();
TwitterWidget.prototype.constructor = TwitterWidget;