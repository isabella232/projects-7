function WebyInit() {
	//WebyLogger.init();
	$('#workspace').show();
	App = new AppClass();
	App.noHeader(true).init();
}