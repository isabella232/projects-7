var WebyDrag = function (el) {

	// Used to fine tune dragging speed
	var deltaFactor = 1.2;
	// Used to fine tune release distance
	var velocityFactor = 1.1;
	// Is drag started
	var drag = false;
	// Last mouse position
	var lastX;
	var lastY;
	// Previous position
	var prevX;
	var prevY;

	this.contentMouseDown = function (event) {
		drag = true;
		lastX = prevX = event.clientX;
		lastY = prevY = event.clientY;
	}

	this.contentMouseMove = function (event) {
		if (!drag) {
			return;
		}
		var deltaX = (event.clientX - lastX) * deltaFactor;
		var deltaY = (event.clientY - lastY) * deltaFactor;

		el.scrollLeft(el.scrollLeft() - deltaX);
		el.scrollTop(el.scrollTop() - deltaY);

		// Save previous position
		prevX = lastX;
		prevY = lastY;

		// Save where the cursor currently is
		lastX = event.clientX;
		lastY = event.clientY;

		event.stopPropagation();
		event.preventDefault();
	}

	this.stopDrag = function () {
		drag = false;
	}

	this.contentMouseUp = function (event) {
		if (drag) {
			this.stopDrag();
			this.animate(event);
		}
	}

	this.animate = function (event) {

		function _animate(velocity, elMethod) {
			velocity *= velocityFactor;
			if (Math.abs(velocity) > 1) {
				var intY = setInterval(function () {
					var move = el[elMethod]() + velocity;
					velocity *= 0.96;
					if (Math.abs(velocity) < 1) {
						return clearInterval(intY);
					}
					el[elMethod](move);
				}, 10);
			}
		}

		_animate(prevX - lastX, 'scrollLeft');
		_animate(prevY - lastY, 'scrollTop');
	}
};
