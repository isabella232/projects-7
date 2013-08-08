function VideoWidget() {

	this._videoType = '';
	this._videoId = false;
	this._previewUrl = '';
	this._widgetClass = 'video-widget';
	this._resizableOptions['minHeight'] = 250;
	this._resizableOptions['minWidth'] = 333;

	this.init = function () {
		BaseWidget.prototype.init.call(this);
	};

	this.getHTML = function () {
		this._html = '<input type="text" placeholder="Paste a Youtube or Vimeo link here" value="youtube.com/watch?v=57--LRvGgKQ"/>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

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
					$this._html.find('.widget-body span.message').html('Sorry, there seems to be a problem with your link.');
					$(this).val('').focus();
				}
			}
		}).focus();
		App.deactivateTool();

	}

	this.createYoutubePreview = function () {
		var $this = this;
		this._html.resizable("option", "aspectRatio", 333 / 250);
		this._previewUrl = 'http://img.youtube.com/vi/' + this._videoId + '/0.jpg';
		var img = $('<img id="video-preview-' + this._id + '" src="' + this._previewUrl + '">');
		img.bind("load", function(){
			$this.createPlayOverlay();
		});
		this._html.find('input').replaceWith(img);
	}

	this.createVimeoPreview = function () {
		var $this = this;
		$.ajax({
			type: 'GET',
			url: 'http://vimeo.com/api/v2/video/' + $this._videoId + '.json',
			jsonp: 'callback',
			dataType: 'jsonp',
			success: function (data) {
				data = data[0];
				$this._previewUrl = data.thumbnail_large;
				var img = $('<img id="video-preview-' + $this._id + '" src="' + $this._previewUrl + '">');
				img.bind("load", function(){
					$this.createPlayOverlay();
				});
				$this._html.find('input').replaceWith(img);
				$this._html.resizable("option", "aspectRatio", data.width / data.height);
			}
		});
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
		var p = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/
		return (link.match(p)) ? RegExp.$3 : false;
	}

	this.getIframe = function () {
		var id = 'video-iframe-' + this._id;
		if (this._videoType == 'youtube') {
			return $('<iframe id="' + id + '" src="http://www.youtube.com/embed/' + this._videoId + '?wmode=transparent&autoplay=1" frameborder="0" wmode="Opaque" allowfullscreen></iframe>');
		}
		return $('<iframe id="' + id + '" src="http://player.vimeo.com/video/' + this._videoId + '?wmode=transparent&autoplay=1" frameborder="0" wmode="Opaque" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');

	}

	BaseWidget.prototype.init.call(this);

}


VideoWidget.prototype = new BaseWidget();
VideoWidget.prototype.constructor = VideoWidget;