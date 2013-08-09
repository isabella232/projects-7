function VideoWidget() {

	this._videoType = '';
	this._videoId = false;
	this._previewUrl = '';
	this._widgetClass = 'video-widget';
	this._resizableOptions['minHeight'] = 250;
	this._resizableOptions['minWidth'] = 333;
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
		this._html.find('input').blur(function () {
			var link = $.trim($(this).val());
			if (link == '') {
				return;
			}
			$this._html.find('.widget-body span.message').html('');
			$this._videoId = $this.parseYoutubeLink(link);
			if ($this._videoId) {
				$this._videoType = 'youtube';
				$this.createYoutubePreview();
			} else {
				$this._videoId = $this.parseVimeoLink(link)
				if ($this._videoId) {
					$this._videoType = 'vimeo';
					$this.createVimeoPreview();
				} else {
					// Invalid input
					$this._html.find('.widget-body span.message').html($this._parseErrorMessage).show();
					$(this).val('').focus();
				}
			}
		}).focus();
		App.deactivateTool();

	}

	this.createYoutubePreview = function () {
		var $this = this;
		this.attachLoading();
		this._html.resizable("option", "aspectRatio", 333 / 250);
		this._previewUrl = 'http://img.youtube.com/vi/' + this._videoId + '/0.jpg';

		$this.checkUrl(this._previewUrl, function (data) {
			if (data.urlExists) {
				var img = $('<img id="video-preview-' + $this._id + '" src="' + $this._previewUrl + '">');
				img.bind("load", function () {
					$this.removeLoading();
					$this.createPlayOverlay();
				});
				$this._html.find('input').replaceWith(img);
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
		this._html.find('.widget-body *').hide();
		this._html.find('.widget-body').prepend('<div class="loading">Let\'s see what we have here...' +
			'<br /><span>Validating your URLs may take a few moments, please be patient.</span></div>');
	}

	this.removeLoading = function () {
		this._html.find('.widget-body .loading').remove();
		this._html.find('.widget-body *').show();
	}

	this.createPlayOverlay = function () {
		var $this = this;
		var height = this._html.height();
		var width = this._html.width();
		var playOverlay = $('<div id="video-preview-overlay-' + this._id + '" class="play-overlay"></div>');
		playOverlay.height(height).width(width);
		playOverlay.click(function () {
			var iframe = $this.getIframe();
			iframe.attr("width", $this._html.width()).attr("height", $this._html.height());
			$this._html.find('.widget-body img').remove();
			$(this).replaceWith(iframe);
			$this._html.resizable("option", "alsoResize", '#' + iframe.attr("id"));
		});
		this._html.find('.widget-body').prepend(playOverlay);
		this._html.resizable("option", "alsoResize", '#video-preview-' + this._id + ', #video-preview-overlay-' + this._id);
		this._isContentLoaded = true;
	}

	this.parseYoutubeLink = function (link) {
		var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		return (link.match(p)) ? RegExp.$1 : false;
	}

	this.parseVimeoLink = function (link) {
		if (link.indexOf('#') > 0) {
			var tmp = link.split('#');
			link = tmp[0];
		}
		var p = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
		return (link.match(p)) ? RegExp.$3 : false;
	}

	this.getIframe = function () {
		var id = 'video-iframe-' + this._id;
		if (this._videoType == 'youtube') {
			this._embedUrl = 'http://www.youtube.com/embed/' + this._videoId + '?wmode=transparent&autoplay=1';
			return $('<iframe id="' + id + '" src="' + this._embedUrl + '" frameborder="0" wmode="Opaque" allowfullscreen></iframe>');
		}
		this._embedUrl = 'http://player.vimeo.com/video/' + this._videoId + '?wmode=transparent&autoplay=1';
		return $('<iframe id="' + id + '" src="' + this._embedUrld + '" frameborder="0" wmode="Opaque" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');

	}
	BaseWidget.prototype.init.call(this);
}


VideoWidget.prototype = new BaseWidget();
VideoWidget.prototype.constructor = VideoWidget;