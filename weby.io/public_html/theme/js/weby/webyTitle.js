function WebyTitle() {

	App.addEventListener(this);
	var _title = $('[data-role="weby-title"] h2');
	var _url = $('[data-role="weby-title"] .weby-url');

	var _titlePosition = _title.position().left;

	this.viewportResize = function (data) {
		var width = $('.header-right').position().left - _titlePosition - 30;
		var titleWidth = _title[0].scrollWidth;
		var urlWidth = _url[0].scrollWidth;

		if (width > urlWidth) {
			_url.css('width', urlWidth + 'px');
		} else {
			_url.css('width', width + 'px');
		}

		if (width > titleWidth) {
			_title.css('width', titleWidth + 'px');
		} else {
			_title.css('width', width + 'px');
		}
	}

	this.viewportResize();
}