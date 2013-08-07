var MouseEvent = function () {};

MouseEvent.normalize = function(e){
	if (e.offsetX == undefined){
		e.offsetX = e.pageX - App.getContent().offset().left;
		e.offsetY = e.pageY - App.getContent().offset().top;
	}

	if(e.target.id == 'content'){
		e.offsetX += App.getContent()[0].scrollLeft;
		e.offsetY += App.getContent()[0].scrollTop;		
	}

	return e;
};
