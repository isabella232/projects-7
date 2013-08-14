var VineTool = function (parent) {
	this._toolTag = 'vine';
	this._mouseText = '{action} to insert a Vine postcard';
	this._tooltipText = 'Vine';
	this._parent = parent;
	this._widgetClass = 'VineWidget';
	this._parserClass = 'VineParser';
}

VineTool.prototype = new BaseTool();
VineTool.prototype.constructor = VineTool;