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
	// If this is set to true - current animation in progress will be aborted
	var stopRelease = false;

	this.contentMouseDown = function (event) {
		drag = true;
		stopRelease = true;
		setTimeout(function(){
			stopRelease = false;
		}, 15);
		lastX = prevX = event.clientX;
		lastY = prevY = event.clientY;
	}

	this.contentMouseMove = function (event) {
		if (!drag || !event.which) {
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
			_animate();
		}
	}

	var _release = function (velocity, elMethod) {
		velocity *= velocityFactor;
		var animateInterval = setInterval(function () {
			if (Math.abs(velocity) < 1 || stopRelease) {
				return clearInterval(animateInterval);
			}
			el[elMethod](el[elMethod]() + (velocity *= 0.96));
		}, 10);
	}

	var _animate = function () {
		_release(prevX - lastX, 'scrollLeft');
		_release(prevY - lastY, 'scrollTop');
	}
};
