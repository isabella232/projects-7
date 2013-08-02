function TextWidget() {

	this._widgetClass = 'text-widget';

	this._resizableOptions = {
		minHeight: 63,
		minWidth: 412
	};

	this.init = function () {
		BaseWidget.prototype.init.call(this);
	};

	this.getHTML = function () {
		this._html = '<div class="text-editable"></div>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		var $this = this;
		this._html.find(".text-editable").kendoEditor({
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
				setTimeout(function () {
					// Restrict to viewport size
					if ($this._html.width() + $this._x + 100 > App.getViewportWidth()) {
						$this._html.width(App.getViewportWidth() - 300);
					}

					if ($this._html.height() + $this._y > App.getViewportHeight()) {
						$this._html.height(App.getViewportHeight() - 300);
					}

					$this.setPosition(150, 150);
				}, 50);
			},
			select: function (e) {

			},
			change: function(e){
				console.log(e)
			}
		});

		BaseWidget.prototype.onWidgetInserted.call(this);

		var $this = this;
		this._html.find(".text-editable").click(function () {
			// Check if EraserTool is activated
			var activeTool = App.getActiveTool();
			if (activeTool != null && activeTool.getTag() == 'eraser') {
				return;
			}

			if ($this._mouseUpAfterDrag) {
				return $this._mouseUpAfterDrag = false;
			}

			if ($this._html.hasClass('.ui-draggable-dragging')) {
				return;
			}
			$this._html.draggable("option", "disabled", true);
			$(this).attr('contenteditable', true).css('z-index', '999998').focus();
		});

		this._html.find('.text-editable').blur(function () {
			$this._html.draggable('option', 'disabled', false);
			$(this).attr('contenteditable', 'false').css('z-index', '1000');
		});

		App.deactivateTool();
		this._html.find(".text-editable").click();

	}

	BaseWidget.prototype.init.call(this);

}


TextWidget.prototype = new BaseWidget();
TextWidget.prototype.constructor = TextWidget;