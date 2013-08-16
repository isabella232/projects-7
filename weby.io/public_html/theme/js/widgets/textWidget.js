function TextWidget() {

	this._content = '';
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
		this._html.find(".text-editable").click().focus();
	}

	this.widgetResize = function (data) {
		this._html.find('.text-editable').width(this._html.width() - 2).height(this._html.height() - 2);
	}

	this.onWidgetInserted = function () {
		this._createEditor();
		BaseWidget.prototype.onWidgetInserted.call(this);
		App.deactivateTool();
		this._html.find(".text-editable").click();

	}

	this.setData = function (data) {
		this.input().css("width", "400px").html(data);
	}

	this._createEditor = function(){
		var $this = this;
		this._html.resizable("option", "alsoResize", '#text-editable-' + this._id);
		this._html.resizable("option", "aspectRatio", false);
		var element = this.input();
		element.kendoEditor({
			tools: [
				"bold",
				"italic",
				"justifyLeft",
				"justifyCenter",
				"justifyRight",
				"justifyFull",
				"insertUnorderedList",
				"insertOrderedList",
				"createLink",
				"unlink",
			],
			paste: function () {

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
			}
		});

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
	}

	/**
	 * EDIT methods
	 */
	this.getSaveData = function () {
		return {
			content: this.body().find('.text-editable').html()
		}
	};

	this.getEditHTML = function () {
		this._html = '<div style="width:'+(this._width-2)+'px; height:'+(this._height-2)+'px" id="text-editable-' + this._id + '" class="text-editable">'+this._content+'</div>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onEditWidgetInserted = function(){
		this._createEditor();
	}

	BaseWidget.prototype.init.call(this);

}


TextWidget.prototype = new BaseWidget();
TextWidget.prototype.constructor = TextWidget;