function WebyInit() {
	WebyLogger.init();
	App = new AppClass(42);
	App.init();
	$('#playWeby').remove();
}