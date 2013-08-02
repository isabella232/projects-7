var EraserTool = function (parent) {
	this._toolTag = 'eraser';
	this._mouseIcon = 'images/eraser.png';
	this._mouseText = 'Click to delete content';
	this._tooltipText = 'Delete content blocks';
	this._parent = parent;

	this.activate = function(){
		$('.widget').click(function(e){
			e.stopPropagation();
			$(this).remove();
		});

		BaseTool.prototype.activate.call(this);
		App.fireEvent("tool.eraser.activated", {}, true);
	};

	this.deactivate = function(){
		$('.widget').unbind("click");
		BaseTool.prototype.deactivate.call(this);
		App.fireEvent("tool.eraser.deactivated", {}, true);
	}
}

EraserTool.prototype = new BaseTool();
EraserTool.prototype.constructor = EraserTool;