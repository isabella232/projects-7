function WebyTitle() {

	App.addEventListener(this);

	/**
	 * Title action button
	 */
	var _editTitle = $('[data-role="weby-title"]');

	/**
	 * Title h2
	 */
	var _title = $('[data-role="weby-title"] h2');

	/**
	 * Weby URL
	 */
	var _url = $('[data-role="weby-url"]');

	/**
	 * Share button
	 */
	var _share = $('[data-role="weby-title-share"]');

	/**
	 * Calculate title position
	 */
	var _titlePosition = _title.position().left;

	/**
	 * Right part of the header
	 */
	var _headerRight = $('.header-right');

    /**
     * Weby title, tags and description dialog
     */
    var _dialog = new WebyTitleDialog();

	_share.find('span').click(function(){
		$(this).parent().toggleClass('active').find('form').toggle();
	});

	_share.find('.close-form').click(function(){
		$(this).closest('[data-role="weby-title-share"]').toggleClass('active').find('form').toggle();
	});

	this.viewportResize = function (data) {
		var width = _headerRight.position().left - _titlePosition;
		var titleWidth = _title[0].scrollWidth;
		var urlWidth = _url[0].scrollWidth;

		if (width > titleWidth + 40) {
			_title.css('width', titleWidth + 'px');
		} else {
			_title.css('width', (width - 40) + 'px');
		}

		if (width > urlWidth + 35) {
			_url.css('width', urlWidth + 'px');
		} else {
			_url.css('width', (width - 35) + 'px');
		}
	}

    this.getDialog = function() {
        return _dialog;
    }

	this.viewportResize();
}