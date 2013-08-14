var PreziTool = function (parent) {
	this._toolTag = 'prezi';
	this._mouseText = '{action} to insert a Prezi presentation';
	this._tooltipText = 'Prezi';
	this._parent = parent;
	this._widgetClass = 'PreziWidget';
	this._parserClass = 'PreziParser';
}

PreziTool.prototype = new BaseTool();
PreziTool.prototype.constructor = PreziTool;