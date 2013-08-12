function VideoWidget() {

	this._videoType = '';
	this._videoId = false;
	this._previewUrl = '';
	this._widgetClass = 'video-widget';
	this._resizableOptions['minHeight'] = 250;
	this._resizableOptions['minWidth'] = 333;
	this._loadingMessage = 'Loading your video...';
	this._parseErrorMessage = "Looks like this video doesn't exist! Try a different URL.";
	this._vimeoApiUrl = 'http://vimeo.com/api/v2/video/';

	this.init = function () {
		BaseWidget.prototype.init.call(this);
	};

	this.getHTML = function () {
		this._html = '<input type="text" placeholder="Paste a Youtube or Vimeo link here" value="http://www.youtube.com/watch?v=FNQowwwwYa0"/>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onActivate = function () {
		if (!this._isContentLoaded) {
			this._html.find('input').focus();
		}
	}

	this.onWidgetInserted = function () {
		var $this = this;
		BaseWidget.prototype.onWidgetInserted.call(this);
		this._html.find(this._inputElement).bind("blur keydown",function (e) {
				// If key was pressed and it is not ENTER
				if (e.type == "keydown" && e.keyCode != 13) {
					return;
				}
				var link = $.trim($(this).val());
				if (link == '') {
					return;
				}
				$this._html.find('.widget-body span.message').html('');

				$this._parserObject = new VideoParser();
				if (($this._videoId = $this._parserObject.parse(link))) {
					$this._videoType = $this._parserObject.getVideoType();
					if ($this._videoType == 'youtube') {
						$this.createYoutubePreview();
					} else {
						$this.createVimeoPreview();
					}
				} else {
					// Invalid input
					$this._html.find('.widget-body span.message').html($this._parseErrorMessage).show();
					$(this).val('').focus();
				}
			}
		).focus();
		App.deactivateTool();

	}

	this.createYoutubePreview = function () {
		var $this = this;
		this.attachLoading();
		this._html.resizable("option", "aspectRatio", 333 / 250);
		this._previewUrl = 'http://img.youtube.com/vi/' + this._videoId + '/0.jpg';

		this.checkUrl(this._previewUrl, function (data) {
			if (data.urlExists) {
				var img = $('<img id="video-preview-' + $this._id + '" src="' + $this._previewUrl + '">');
				img.bind("load", function () {
					$this.removeLoading();
					$this.createPlayOverlay();
				});
				$this._html.find('input').replaceWith(img);
				$this._html.find('.message').remove();
			} else {
				$this._html.find('.widget-body span.message').html($this._parseErrorMessage).show();
				$this._html.find('input').val('').focus();
				$this.removeLoading();
			}
		});
	}

	this.createVimeoPreview = function () {
		var $this = this;
		this.attachLoading();
		this.checkUrl(this._vimeoApiUrl + $this._videoId + '.json', function (data) {
			if (data.urlExists) {
				$.ajax({
					type: 'GET',
					url: $this._vimeoApiUrl + $this._videoId + '.json',
					jsonp: 'callback',
					dataType: 'jsonp',
					success: function (data) {
						data = data[0];
						$this._previewUrl = data.thumbnail_large;
						var img = $('<img id="video-preview-' + $this._id + '" src="' + $this._previewUrl + '">');
						img.bind("load", function () {
							$this.removeLoading();
							$this.createPlayOverlay();
						});
						$this._html.find('input').replaceWith(img);
						$this._html.find('.message').remove();
						$this._html.resizable("option", "aspectRatio", data.width / data.height);
					}
				});
			} else {
				$this._html.find('.widget-body span.message').html($this._parseErrorMessage).show();
				$this._html.find('input').val('').focus();
				$this.removeLoading();
			}
		});
	}

	this.attachLoading = function () {
		var loadingHtml = this.getLoadingHtml();
		this._html.find('.widget-body *').hide();
		this._html.find('.widget-body').prepend(loadingHtml);
	}

	this.removeLoading = function () {
		this._html.find('.widget-body .loading').remove();
		this._html.find('.widget-body *').show();
	}

	this.createPlayOverlay = function () {
		var $this = this;
		var height = this._html.height();
		var width = this._html.width();
		var playOverlay = $('<div class="play-overlay"></div>');
		playOverlay.height(height).width(width);
		playOverlay.click(function () {
			$this._insertIframe($this.getIframe());
		});
		this._html.find('.widget-body').prepend(playOverlay);
		this._html.resizable("option", "alsoResize", '#video-preview-' + this._id + ', .play-overlay');
		this._isContentLoaded = true;
	}

	this.getIframe = function () {
		var id = 'video-iframe-' + this._id;
		this._alsoResize = '#' + id;
		if (this._videoType == 'youtube') {
			this._embedUrl = 'http://www.youtube.com/embed/' + this._videoId + '?wmode=transparent&autoplay=1';
			return $('<iframe id="' + id + '" src="' + this._embedUrl + '" width="560" height="315" frameborder="0" wmode="Opaque" allowfullscreen></iframe>');
		}
		this._embedUrl = 'http://player.vimeo.com/video/' + this._videoId + '?wmode=transparent&autoplay=1';
		return $('<iframe id="' + id + '" src="' + this._embedUrl + '" frameborder="0" wmode="Opaque" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');

	}

	this._insertIframe = function (iframe) {
		var $this = this;

		var iframeWidth = $(iframe).attr("width");
		var iframeHeight = $(iframe).attr("height");

		iframe = $(iframe)[0];
		iframe.setAttribute("width", 0);
		iframe.setAttribute("height", 0);

		$this._html.find('.widget-body').append(iframe);

		// Append LOADING screen (move to BaseWidget)
		$this._html.find('.widget-body').prepend('<div class="loading" style="width: '+$this._html.width()+'px; height: '+$this._html.height()+'px">' + $this._loadingMessage +
			'<br /><span>This may take a few moments, please be patient.</span></div>');
		$('#video-preview-' + $this._id+', .play-overlay').remove();

		var jIframe = $('#' + $(iframe).attr('id'));

		jIframe.bind('load', function () {
			jIframe[0].setAttribute("width", iframeWidth);
			jIframe[0].setAttribute("height", iframeHeight);
			$this._html.find('.loading, .play-overlay').remove();
			$this.showResizeHandle();
			$this._isContentLoaded = true;
		});

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


VideoWidget.prototype = new BaseWidget();
VideoWidget.prototype.constructor = VideoWidget;