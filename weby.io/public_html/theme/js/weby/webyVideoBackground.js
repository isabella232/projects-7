function WebyVideoBackground(el) {

	var _el = el;
	var _video = null;
	var _player = null;

	this.setVideo = function (video) {
		_video = video;
		return this;
	}

	this.render = function () {
		if (_video == null) {
			return;
		}
		_loadYoutubeBackground();
	}

	this.populate = function (data) {
		if (!data) {
			return;
		}
		_video = data.video == "" ? null : data.video;
	}

	this.save = function () {
		return {
			video: _video
		}
	}

	this.viewportResize = function () {
		var wp = App.getContentWrapper().offset();
		var css = {
			width: (App.getContentWrapper().width() - App.getWeby().getScrollBarOffset()) + 'px',
			height: (App.getContentWrapper().height() - App.getWeby().getScrollBarOffset()) + 'px',
			top: wp.top+'px',
			left: wp.left+'px'
		};
		_el.css(css);
		if(_player){
			$('#player').css(css);
		}
	}

	_loadYoutubeBackground = function () {
		if (_player == null) {
			_player = new YT.Player('player', {
				width: App.getContent().width(),
				height: App.getContent().height(),
				videoId: _video,
				playerVars: {
					loop: 1,
					controls: 0,
					showinfo: 0,
					modestbranding: 1,
					wmode: 'transparent'
				},
				events: {
					onReady: function (e) {
						e.target.playVideo();
						e.target.mute();
					}
				}
			});
		} else {
			_player.loadVideoById(_video);
		}
	};
}