function VideoWidget() {

	this._widgetClass = 'video-widget';
	this._parseErrorMessage = 'We couldn\'t insert the given URL. Please try a different one.';
	this._inputElement = 'input';
	this._aspectRatio = 16 / 9;
	this._loadingMessage = 'Loading your video...';

	this.getHTML = function () {
		this._html = '<input type="text" placeholder="Paste a Youtube or Vimeo link here" value="youtube.com/watch?v=57--LRvGgKQ"/>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function(input){
		var embedLink = this.parseYoutubeLink(input)
		var iframe = false;
		var id = 'youtube-iframe-'+ this._id;
		this._alsoResize = '#'+id;
		if(embedLink){
			iframe = '<iframe id="'+id+'" width="560" height="315" src="http://www.youtube.com/embed/'+embedLink+'?wmode=transparent" frameborder="0" wmode="Opaque" allowfullscreen></iframe>';
		} else {
			embedLink = this.parseVimeoLink($(this).val())
			if(embedLink){
				iframe = '<iframe id="'+id+'" src="http://player.vimeo.com/video/'+embedLink+'?wmode=transparent" width="560" height="315" frameborder="0" wmode="Opaque" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			}
		}
		return iframe;
	}

	this.parseYoutubeLink = function(link){
		var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		return (link.match(p)) ? RegExp.$1 : false;
	}

	this.parseVimeoLink = function(link){
		if(link.indexOf('#') > 0){
			var tmp = link.split('#');
			link = tmp[0];
		}
		var p = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/
		return (link.match(p)) ? RegExp.$3 : false;
	}

	BaseIframeWidget.prototype.init.call(this);
}


VideoWidget.prototype = new BaseIframeWidget();
VideoWidget.prototype.constructor = VideoWidget;