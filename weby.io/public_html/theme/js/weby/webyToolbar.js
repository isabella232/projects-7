function WebyToolbar() {

	App.addEventListener(this);

	var _activeWidget;
	var _widgetSettings = $('#widget-settings-dropdown');
	var _canvasSettings = $('#canvas-settings-dropdown');
	var _documentBackgroundSettings = $('#document-settings');
	var _webyColorPicker;
	var _documentColorPicker;
	var _colorPicker;
	var _opacitySlider;
	var _widthSlider;
	var _radiusSlider;
	var _shadowDistanceSlider;
	var _shadowSpreadSlider;
	var _shadowColorPicker;
	var _canvasWidth;
	var _canvasHeight;
	var _fileWidget = $('#file-widget');
	var _removeImageBtn = $('#background-image-remove');
	var _imageMode;

	$('.send-backward').click(function () {
		_activeWidget.sendBackward();
	});

	$('.bring-forward').click(function () {
		_activeWidget.bringForward();
	});

	$('.send-to-back').click(function () {
		_activeWidget.sendToBack();
	});

	$('.bring-to-front').click(function () {
		_activeWidget.bringToFront();
	});

	$('.background').click(function () {
		if (_canvasSettings.css('display') == 'none') {
			_canvasSettings.show();
			_webyColorPicker.value(_webyColorPicker.value());
		} else {
			_canvasSettings.hide();
		}
	});

	$('#canvas-settings-youtube').keydown(function (e) {
		var input = $(this);
		var val = $.trim(input.val());
		if (e.keyCode == 13 && val != '') {
			var parser = new VideoParser();
			var videoId = parser.parse(val);
			if (videoId && parser.getVideoType() == 'youtube') {
				// @TODO: Check if video exists
				App.getWeby().getBackground().setVideo(videoId).render();
			} else {
				// Show error
			}
		}
	});

	$('#canvas-settings').tabs();

	var currentColor = App.getWeby().getBackground().getColor();

	_webyColorPicker = $("#color-picker").kendoFlatColorPicker({
		preview: true,
		opacity: true,
		value: currentColor == null ? '#ffffff' : currentColor,
		change: function (e) {
			App.getWeby().getBackground().setColor(e.value).render();
		}
	}).data("kendoFlatColorPicker");

	var patternsDataSource = new kendo.data.DataSource({
		data: WebyPatterns.PATTERNS,
		pageSize: 5
	});

	$(".patterns-pager").kendoPager({
		dataSource: patternsDataSource,
		buttonCount: 1
	});

	$("#patterns-list").kendoListView({
		dataSource: patternsDataSource,
		template: kendo.template('<div class="pattern" data-pattern="${name}" style="background: url(\'' + THEME + 'images/patterns/${name}\') ${repeat}"></div>'),
		selectable: "single",
		change: function () {
			App.getWeby().getBackground().setPattern(this.select().attr("data-pattern")).render();
		}
	});

	/**
	 * WIDGET SETTINGS
	 */

	$('#weby-toolbar-wrapper .tool-icon.frame').click(function () {
		if (_activeWidget == null) {
			return;
		}
		if (_widgetSettings.css('display') == 'none') {
			_widgetSettings.show();
			_activeWidget.hideTools().html('.widget-disabled-overlay').hide();
			_colorPicker.value(_colorPicker.value());
		} else {
			_widgetSettings.hide();
			_activeWidget.showTools().html('.widget-disabled-overlay').show();
		}
	});

	_colorPicker = $("#widget-color").kendoColorPicker({
		opacity: true,
		preview: true,
		buttons: false,
		select: function (e) {
			_activeWidget.setColor(e.value);
		}
	}).data("kendoColorPicker");

	_opacitySlider = $("#widget-opacity").kendoSlider({
		min: 0,
		max: 100,
		showButtons: false,
		tickPlacement: 'none',
		slide: function (e) {
			_activeWidget.setOpacity(e.value / 100);
		}
	}).data("kendoSlider");

	_radiusSlider = $("#widget-radius").kendoSlider({
		min: 0,
		max: 20,
		showButtons: false,
		tickPlacement: 'none',
		slide: function (e) {
			_activeWidget.setRadius(e.value);
		}
	}).data("kendoSlider");

	_widthSlider = $("#widget-width").kendoSlider({
		min: 0,
		max: 50,
		showButtons: false,
		tickPlacement: 'none',
		slide: function (e) {
			_activeWidget.setPadding(e.value);
		}
	}).data("kendoSlider");

	_shadowDistanceSlider = $("#widget-shadow-distance").kendoSlider({
		min: 0,
		max: 50,
		showButtons: false,
		tickPlacement: 'none',
		slide: function (e) {
			_activeWidget.setShadowDistance(e.value);
		}
	}).data("kendoSlider");

	_shadowSpreadSlider = $("#widget-shadow-spread").kendoSlider({
		min: 0,
		max: 50,
		showButtons: false,
		tickPlacement: 'none',
		slide: function (e) {
			_activeWidget.setShadowSpread(e.value);
		}
	}).data("kendoSlider");

	_shadowColorPicker = $("#shadow-color").kendoColorPicker({
		opacity: true,
		preview: true,
		buttons: false,
		select: function (e) {
			_activeWidget.setShadowColor(e.value);
		}
	}).data("kendoColorPicker");

	_removeImageBtn.click(function () {
		App.getWeby().getBackground().setImage(null).render();
		_fileWidget.show();
		_removeImageBtn.hide();
		_imageMode.hide();
	});

	$("#file").kendoUpload({
		multiple: false,
		async: {
			saveUrl: WEB + "editor/upload-image/?weby=" + App.getWeby().getId(),
			autoUpload: true
		},
		showFileList: false,
		localization: {
			select: 'Select image...'
		},
		success: function (e) {
			if (e.operation != "upload") {
				return;
			}

			if (e.response.error) {
				if (e.operation == "upload") {
					$('span.file-error').html(e.response.msg).show();
				}
			} else {
				App.getWeby().getBackground().setImageMode('aligned').setImage(e.response.url).setAlign('left top').render();
				App.getWeby().getBackground().widgetDrag();
				_imageMode.setMode('aligned').setAlignment('left top').show();
				_fileWidget.hide();
				_removeImageBtn.show();
			}
			_fileWidget.find('.k-upload-status').remove();
		},
		select: function (e) {
			$('span.file-error').html('').hide();
			if (e.files[0].size > 2097152) {
				$('span.file-error').html('Please select a file smaller than 2MB.').show();
				e.preventDefault();
			}
		}
	});

	$('#file-widget .k-upload-empty').removeClass('k-upload-empty').addClass('k-upload');

	$('span.file-error').hide();

	if (App.getWeby().getBackground().getImage() != null) {
		_fileWidget.hide();
		_removeImageBtn.show();
	}

	/**
	 * CANVAS SIZE
	 */

	var _previousWidth = 0;
	var _previousHeight = 0;
	var _lastWidth = 0;
	var _lastHeight = 0;

	var _canvasSizeChange = function (type) {
		if (_canvasWidth.value() == _lastWidth && _canvasHeight.value() == _lastHeight) {
			return;
		}
		if (_canvasWidth.value() == null) {
			_canvasWidth.value(App.getViewportWidth() - App.getWeby().getScrollBarOffset());
		}
		if (_canvasHeight.value() == null) {
			_canvasHeight.value(App.getViewportHeight() - App.getTopOffset() - App.getWeby().getScrollBarOffset() - App.getBottomOffset());
		}
		App.getWeby().getBackground().applyCanvasSize(_canvasWidth.value(), _canvasHeight.value(), type);

		_previousWidth = _lastWidth;
		_lastWidth = _canvasWidth.value();
		_previousHeight = _lastHeight;
		_lastHeight = _canvasHeight.value();
	}

	_canvasWidth = $("#canvas-width").kendoNumericTextBox({
		min: 600,
		step: 1,
		decimals: 0,
		format: "n0",
		change: function (e) {
			_canvasSizeChange('change');
		},
		spin: function (e) {
			_canvasSizeChange('spin');
		}
	}).data("kendoNumericTextBox");

	_canvasHeight = $("#canvas-height").kendoNumericTextBox({
		min: 600,
		step: 1,
		decimals: 0,
		format: "n0",
		change: function (e) {
			_canvasSizeChange('change');
		},
		spin: function (e) {
			_canvasSizeChange('spin');
		}
	}).data("kendoNumericTextBox");

	this.setCanvasSize = function (width, height) {
		if (_previousWidth == 0) {
			_previousWidth = _lastWidth = width;
			_previousHeight = _lastHeight = height;
		}
		_canvasWidth.value(width);
		_canvasHeight.value(height);
	}

	this.restorePreviousCanvasSize = function () {
		this.setCanvasSize(_previousWidth, _previousHeight);
		_lastHeight = _previousHeight;
		_lastWidth = _previousWidth;
	}

	/**
	 * DOCUMENT SETTINGS
	 */

	$("#document-settings").kendoTabStrip({
		animation: {
			open: {
				effects: "fadeIn"
			}
		}
	});

	var currentColor = App.getWeby().getDocumentBackground().getColor();

	_documentColorPicker = $("#document-color-picker").kendoFlatColorPicker({
		preview: true,
		value: currentColor == null ? '#ffffff' : currentColor,
		change: function (e) {
			App.getWeby().getDocumentBackground().setColor(e.value).render();
		}
	}).data("kendoFlatColorPicker");

	$("#document-patterns-list").kendoListView({
		dataSource: patternsDataSource,
		template: kendo.template('<div class="pattern" data-pattern="${name}" style="background: url(\'' + THEME + 'images/patterns/${name}\') repeat"></div>'),
		selectable: "single",
		change: function () {
			App.getWeby().getDocumentBackground().setPattern(this.select().attr("data-pattern")).render();
		}
	});

	$('#weby-toolbar-wrapper .document').click(function () {
		var $this = $(this);
		var css = {
			top: $this.offset().top + $this.height() + 10 + 'px',
			left: $this.offset().left + 'px'
		};

		if (_documentBackgroundSettings.css('display') == 'none') {
			_documentBackgroundSettings.css(css).show();
			_documentColorPicker.value(_documentColorPicker.value());
		} else {
			_documentBackgroundSettings.hide();
		}
	});

	/**
	 * EVENTS
	 */

	this.webyLoaded = function () {
		_imageMode = new WebyImageMode();
	}

	this.contentClick = function (e) {
		_canvasSettings.hide();
	};

	this.widgetClick = function () {
		_widgetSettings.hide();
		_activeWidget.showTools().html('.widget-disabled-overlay').show();
	}

	this.widgetDrag = function (data) {
		App.getWeby().getBackground().widgetDrag(data);
	}

	this.widgetActivated = function (widget) {
		_activeWidget = widget;
		$('#weby-toolbar-wrapper a.tool-icon').removeClass('disabled');
		// Get widget settings
		var settings = _activeWidget.getFrameSettings();
		_colorPicker.value(settings.color);
		_radiusSlider.value(settings.radius);
		_opacitySlider.value(parseFloat(settings.opacity) * 100);
		_widthSlider.value(settings.padding);
		_shadowDistanceSlider.value(parseInt(settings.shadowY));
		_shadowSpreadSlider.value(parseInt(settings.shadowSpread));
		_shadowColorPicker.value(settings.shadowColor);
	}

	this.widgetDeactivated = function () {
		_activeWidget = null;
		_widgetSettings.hide();
		$('#weby-toolbar-wrapper a.tool-icon:not(".background, .document")').addClass('disabled');
	}
}