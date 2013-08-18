function WidgetOverlapping(widget) {
	var _offset = 0;

	var _rectangle = new Rectangle(new Vector(widget._left, widget._top), widget.html().width() - _offset, widget.html().height() - _offset, widget._rotation);

	this.isOverlapping = function (targetWidget) {
		console.log(_rectangle)
		var targetRectangle = new Rectangle(
			new Vector(targetWidget._left, targetWidget._top),
			targetWidget.html().width() - _offset,
			targetWidget.html().height() - _offset,
			targetWidget._rotation
		);

		console.log(targetRectangle)
		return _rectangle.isColliding(targetRectangle);
	}
}
