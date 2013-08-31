function FlickerWidget() {

	this._flickerCode = '';

	this.getHTML = function () {
		this._html = this._flickerCode;
		return BaseWidget.prototype.getHTML.call(this);
	};
}

FlickerWidget.prototype = new BaseWidget();
FlickerWidget.prototype.constructor = FlickerWidget;