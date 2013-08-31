function TextWidget() {

	this._content = '';
	this._widgetClass = 'text-widget';

	this.getHTML = function () {
		this._html = this._content;
		return BaseWidget.prototype.getHTML.call(this);
	};
}

TextWidget.prototype = new BaseWidget();
TextWidget.prototype.constructor = TextWidget;