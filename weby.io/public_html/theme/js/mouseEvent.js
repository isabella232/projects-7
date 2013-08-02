var MouseEvent = function () {}

MouseEvent.normalize = function(e){
	if (e.offsetX == undefined)
	{
		e.offsetX = e.pageX - $('#content').offset().left;
		e.offsetY = e.pageY - $('#content').offset().top;
	}
	return e;
}
