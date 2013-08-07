var BaseTool = function () {
	this._parent = null;
	this._toolTag = '';
	this._mouseIcon = '';
	this._mouseText = '';
	this._tooltipText = '';
	this._mouseIconObject = null;
}

BaseTool.WIDGET_COUNT = 0;

BaseTool.prototype = {

	// Call to 'parent': BaseTool.prototype.contentClick.call(this);

	init: function () {
		// Called only first time a tool is constructed (when adding to toolbar)
	},

	getTag: function () {
		return this._toolTag;
	},

	activate: function () {
		// Called each time a tool is activated in the toolbar
		this.createMouseIcon();
		this._parent.getElement().find('[data-tool="' + this._toolTag + '"]').toggleClass('k-state-active');

		App.addContentOverlay();
		$('body').addClass('unselectable');
		$('body').mousemove(function (e) {
			App.fireEvent("document.mouse.move", e);
		});
	},

	deactivate: function () {
		// Called each time a tool is deactivated in the toolbar
		this._mouseIconObject.remove();
		this._parent.getElement().find('[data-tool="' + this._toolTag + '"]').toggleClass('k-state-active');
		App.removeContentOverlay();
		$('body').removeClass('unselectable');
		$('body').unbind("mousemove");
	},

	getToolbarIcon: function () {
		var _icon = $('<a data-tool="' + this._toolTag + '" class="tool-icon" title="' + this._tooltipText + '">' + this._tooltipText + '</a>');
		_icon.css('background-image', 'url('+THEME + this._mouseIcon + ')');
		return _icon;
	},

	getToolbar: function () {
		return null;
	},

	createMouseIcon: function () {
		this._mouseIconObject = $('<a class="mouse-icon" ><img src="' + THEME + this._mouseIcon + '">' +
			'<span class="action">' + this._mouseText + '</span><span class="cancel">(Press ESC to cancel)</span>' +
			'</a>');

		this._mouseIconObject.css('position', 'absolute');

		$('body').append(this._mouseIconObject);
	},

	insertWidgetAt: function (widget, x, y) {
		var html = widget.setId(++BaseTool.WIDGET_COUNT).setPosition(x, y).getHTML();
		App.getContent().append(html);
		App.addWidget(widget);
		widget.onWidgetInserted();
	},

	onWidgetInserted: function () {
	},

	documentMouseMove: function (e) {
		this._mouseIconObject.offset({ top: e.pageY, left: e.pageX + 18});
	},

	contentClick: function (e) {

	}
};