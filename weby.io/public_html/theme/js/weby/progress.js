function WebyProgress() {

	var _el = null;
	var _steps = 0;
	var _curStep = 0;
	var _stepWidth = 0;

	this.startLoading = function () {
		var margin = $(window).height() / 2 - 50;
		$('body').append('<div id="app-loading"><div class="color"></div><span style="top: ' + margin + 'px">' +
			'<span id="progress-message">Loading your Weby...</span><br/>' +
			'<span class="progressbar"><span id="progress"></span>' +
			'</div>');
		_el = $('#progress');
	}

	this.setMessage = function (message) {
		$('#progress-message').html(message);
	}

	this.setSteps = function (steps) {
		_steps = steps;
		_stepWidth = Math.round(280 * 1000 / _steps) / 1000;
	}

	this.next = function () {
		_curStep++;
		_el.css({width: _curStep * _stepWidth + 'px'});
	}

	this.hideProgress = function () {
		setTimeout(function(){
			$('#app-loading').fadeOut('slow', function () {
				$(this).remove();
			});
		}, 500);
	}

}