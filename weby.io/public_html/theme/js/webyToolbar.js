var WebyToolbar = function () {

	var _activeWidget;

	$('.toggle-frame').click(function(){
		_activeWidget.toggleFrame();
	});

	$('.send-backward').click(function(){
		_activeWidget.sendBackward();
	});

	$('.bring-forward').click(function(){
		_activeWidget.bringForward();
	});

	$('.send-to-back').click(function(){
		_activeWidget.sendToBack();
	});

	$('.bring-to-front').click(function(){
		_activeWidget.bringToFront();
	});

	this.widgetActivated = function(widget){
		_activeWidget = widget;
		$('#weby-toolbar-wrapper a.tool-icon').removeClass('disabled');
	}

	this.widgetDeactivated = function(){
		_activeWidget = null;
		$('#weby-toolbar-wrapper a.tool-icon').addClass('disabled');
	}
}