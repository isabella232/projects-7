var BaseIframeWidget = function () {
	/**
	 * Embed URL is the full url of the resource
	 * Ex: http://www.youtube.com/embed/FNQowwwwYa0?wmode=transparent&autoplay=1
	 */
	this._embedUrl = '';

	/**
	 * Error message to show when an invalid resource is given
	 */
	this._parseErrorMessage = '';

	/**
	 * This selector is also resized when widget is being resized
	 * Ex: '#video-iframe-1' will make this iframe autamatically resized with widget
	 */
	this._alsoResize = false;

	/**
	 * Aspect ratio of widget if necessary
	 */
	this._aspectRatio = false;

	/**
	 * If this is set to `true` or a method name, iframe "load" event will not be bound
	 * If method name is given - it will be called right after iframe is inserted into the DOM (iframe object will be passed).
	 * If simply `true` - nothing will be done (LinkedInWidget is using this as it's calling a callback from within iframe)
	 * NOTE: you will have to manually set this._isContentLoaded
	 */
	this._customOnLoadHandler = false;

	/**
	 * Tells if widget content is successfully loaded
	 */
	this._isContentLoaded = false;

	/**
	 * Resizable options that will be merged with _baseResizableOptions
	 */
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
			App.fireEvent("widget.resize", {element: $(this), event: event, ui: ui});
		}
	};

	/**
	 * When widget is activated...
	 */
	this.onActivate = function () {
		if (!this._isContentLoaded) {
			this._html.find(this._inputElement).focus();
		}
	}

	/**
	 * When widget is inserted...
	 */
	this.onWidgetInserted = function () {
		var $this = this;

		BaseWidget.prototype.onWidgetInserted.call(this);

		this.hideResizeHandle();

		this._html.find(this._inputElement).bind("blur keydown", function (e) {
			// If key was pressed and it is not ENTER
			if(e.type == "keydown" && e.keyCode != 13){
				return;
			}
			var input = $(this);
			if (input.val() != '') {
				var targetUrl = $this.getTargetUrl(input.val());
				// If no targetUrl was returned - show parse error message
				if(!targetUrl){
					$this._html.find('.message').html($this._parseErrorMessage);
					input.val('');
					if($this._isActive){
						input.focus();
					}
					return;
				}
				// If targetUrl was received - check if it really exists
				var loadingHtml = $this.getLoadingHtml();
				$this._html.find('.widget-body *').hide();
				$this._html.find('.widget-body').prepend(loadingHtml);

				$this.checkUrl(targetUrl, function (data) {
					$this._html.find('.loading').remove();
					if (data.urlExists) {
						$this._embedUrl = targetUrl;
						var iframe = $this.getIframe();
						$this._insertIframe(input, iframe);
					} else {
						$this._html.find('.widget-body *').show();
						$this._html.find('.message').html($this._parseErrorMessage);
						input.val('');
						if($this._isActive){
							input.focus();
						}
						return;
					}
				});
			}
		});

		App.deactivateTool();
		this._html.find($this._inputElement).focus();
	}

	/**
	 * (PRIVATE)
	 *
	 * Insert iframe
	 * @param input jQuery input element
	 * @param iframe Html
	 */
	this._insertIframe = function (input, iframe) {
		var $this = this;

		var iframeWidth = $(iframe).attr("width");
		var iframeHeight = $(iframe).attr("height");

		iframe = $(iframe)[0];
		iframe.setAttribute("width", 0);
		iframe.setAttribute("height", 0);

		input.hide();
		$(iframe).insertBefore(input);

		// Append LOADING screen (move to BaseWidget)
		$this._html.find('.widget-body').prepend('<div class="loading">' + $this._loadingMessage +
			'<br /><span>This may take a few moments, please be patient.</span></div>');

		var jIframe = $('#' + $(iframe).attr('id'));

		// Bind `load` if no custom handler is specified
		if (!$this._customOnLoadHandler) {
			jIframe.bind('load', function () {
				$(iframe).attr("width", iframeWidth).attr("height", iframeHeight);
				input.remove();
				$this._html.find('.loading').remove();
				$this.showResizeHandle();
				$this._html.find('.message').remove();
				$this._isContentLoaded = true;
                if('onContentLoaded' in $this){
                    $this.onContentLoaded();
                }
			});
		}

		// If custom iframe load handler is specified - call it and pass it a jQuery iframe object
		if(typeof $this._customOnLoadHandler == 'string'){
			$this[$this._customOnLoadHandler](jIframe);
		}

		if ($this._alsoResize) {
			$this._html.resizable("option", "alsoResize", $this._alsoResize);
		}
		if ($this._aspectRatio) {
			$this._html.resizable("option", "aspectRatio", $this._aspectRatio);
		}
		App.fireEvent("widget.resize.stop", {element: $this._html});
	}

	BaseWidget.prototype.init.call(this);
}

BaseIframeWidget.prototype = new BaseWidget();
BaseIframeWidget.prototype.constructor = BaseIframeWidget;