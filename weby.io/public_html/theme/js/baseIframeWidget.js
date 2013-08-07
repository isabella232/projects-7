var BaseIframeWidget = function () {

	this._inputElement = 'input';
	this._parseErrorMessage = '';
	this._alsoResize = false;
	this._aspectRatio = false;

	this._resizableOptions = {
		start: function (event, ui) {
			$(this).find('.widget-body').prepend('<div class="overlay"></div>');
			App.fireEvent("widget.resize.start", {element: $(this), event: event, ui: ui});
		},
		stop: function (event, ui) {
			App.fireEvent("widget.resize.stop", {element: $(this), event: event, ui: ui});
			$(this).find('.overlay').remove();
			$(this).css('height', 'auto');
		},
		resize: function (event, ui) {
			$(this).find('.overlay').css('height', $(this).height()).css('width', $(this).width());
		}
	};

	this.onWidgetInserted = function () {
		var $this = this;

		BaseWidget.prototype.onWidgetInserted.call(this);

		this.hideResizeHandle();

		this._html.find(this._inputElement).blur(function () {
			if ($(this).val() != '') {
				var iframe = $this.getIframe($(this).val())
				if (!iframe) {
					$this._html.find('.message').html($this._parseErrorMessage);
					$(this).val('').focus();
					return;
				}

				var iframeWidth = $(iframe).attr("width");
				var iframeHeight = $(iframe).attr("height");
				$(this).replaceWith(iframe);

				// Append LOADING screen (move to BaseWidget)
				$this._html.find('.widget-body').prepend('<div class="loading">' + $this._loadingMessage +
					'<br /><span>This may take a few moments, please be patient.</span></div>');
				var top = iframeHeight / 2 - 20;
				var loading = $this._html.find('.loading');
				loading.css('height', iframeHeight - top).css('width', iframeWidth);
				loading.css("margin", "0 auto");
				loading.css("padding-top", top + "px");
				$('#' + $(iframe).attr('id')).bind('load', function () {
					setTimeout(function(){
						$this._html.find('.loading').remove();
						$this.showResizeHandle();
					}, 100);
				});

				if ($this._alsoResize) {
					$this._html.resizable("option", "alsoResize", $this._alsoResize);
				}
				if ($this._aspectRatio) {
					$this._html.resizable("option", "aspectRatio", $this._aspectRatio);
				}

				//$this._html.draggable($this._baseDraggableOptions);
				$this._html.find('.message').remove();
				App.fireEvent("widget.resize.stop", {element: $this._html});
			}
		});

		App.deactivateTool();
		this._html.find($this._inputElement).focus();
	}
}

BaseIframeWidget.prototype = new BaseWidget();
BaseIframeWidget.prototype.constructor = BaseIframeWidget;