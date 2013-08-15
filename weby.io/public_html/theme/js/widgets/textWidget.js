function TextWidget() {

	this._widgetClass = 'text-widget';
	this._isContentLoaded = true;
	this._inputElement = '.text-editable';

	this._resizableOptions = {
		minHeight: 63,
		minWidth: 412
	};

	this.init = function () {
		BaseWidget.prototype.init.call(this);
	};

	this.getHTML = function () {
		this._html = '<div id="text-editable-' + this._id + '" class="text-editable"></div>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onMakeEditable = function () {
		this._html.find(".text-editable").focus();
	}

	this.widgetResize = function (data) {
		this._html.find('.text-editable').width(this._html.width() - 2).height(this._html.height() - 2);
	}

	this.onWidgetInserted = function () {
		var $this = this;
		var element = this._html.find('.text-editable');
		element.kendoEditor({
			tools: [
				"bold",
				"italic",
				"underline",
				"justifyLeft",
				"justifyCenter",
				"justifyRight",
				"justifyFull",
				"insertUnorderedList",
				"insertOrderedList",
				"indent",
				"outdent",
				"createLink",
				"unlink",
				"insertImage",
			],
			paste: function (e) {

				$this._html.css("width", $this._html.width() + 'px');
				$this._html.css("height", $this._html.height() + 'px');

				setTimeout(function () {
					// Restrict to viewport size
					if ($this._html.width() + $this._x + 500 > App.getViewportWidth()) {
						$this._html.width(App.getViewportWidth() - 300);
					}

					if ($this._html.height() + $this._y > App.getViewportHeight()) {
						$this._html.height(App.getViewportHeight() - 300);
					}
				}, 50);
			},
			select: function (e) {

			},
			change: function (e) {
				console.log(e)
			}
		});

		BaseWidget.prototype.onWidgetInserted.call(this);

		element.click(function () {
			if ($this._mouseUpAfterDrag) {
				return $this._mouseUpAfterDrag = false;
			}

			if ($this._html.hasClass('.ui-draggable-dragging')) {
				return;
			}
			$this._html.draggable("option", "disabled", true);
			$(this).attr('contenteditable', true).css('z-index', '999998').focus();
		});

		element.blur(function () {
			$this._html.draggable('option', 'disabled', false);
			$(this).attr('contenteditable', 'false').css('z-index', '1000');
		});

		//this._html.resizable("option", "alsoResize", '#text-editable-' + this._id);

		App.deactivateTool();
		this._html.find(".text-editable").click();

	}

	this.setData = function (data) {
		this.input().css("width", "400px").html(data);
	}

	BaseWidget.prototype.init.call(this);

}


TextWidget.prototype = new BaseWidget();
TextWidget.prototype.constructor = TextWidget;