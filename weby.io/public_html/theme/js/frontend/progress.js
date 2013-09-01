function WebyProgress(el, steps, totalWidth){

	var _currentStep = 0;

	this.next = function(){
		_currentStep++;
		el.width(totalWidth / steps * _currentStep);
	}

}