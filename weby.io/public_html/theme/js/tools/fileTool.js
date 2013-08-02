var FileTool = function (parent) {
    this._toolTag = 'file';
    this._mouseIcon = 'images/file.png';
    this._mouseText = 'Click to put file';
    this._tooltipText = 'Insert file';
    this._parent = parent;
    this._dragListener;

    this.contentClick = function (e) {
        BaseTool.prototype.contentClick.call(this, e);
        var widget = new FileWidget();
        this.insertWidgetAt(widget, e.offsetX, e.offsetY);
    }

    this.init = function () {
        var $this = this;
        this._dragListener = new FileDragListener();
        BaseTool.prototype.init.call(this);
    }
}

FileTool.prototype = new BaseTool();
FileTool.prototype.constructor = TextTool;