function WebyVideoBackground() {

	var _video = null;
	var _player = null;

	this.setVideo = function (video) {
		_video = video;
		return this;
	}

	this.render = function () {
		if (_video == null) {
			App.getContentBackground().html('<div id="player"></div>');
			return;
		}
		App.getContent().css({
			'background-image': 'none',
			'background-color': 'transparent'
		});
		_loadYoutubeBackground();
	}

	this.populate = function (data) {
		if(!data){
			return;
		}
		_video = data.video == "" ? null : data.video;
	}

	this.save = function(){
		return {
			video: _video
		}
	}

	this.resize = function(){
		// Resize player
		if (_player != null) {
			$('#player').css({
				width: App.getContent().width(),
				height: App.getContent().height()
			});
		}
	}

	_loadYoutubeBackground = function () {
		if (_player == null) {
			_player = new YT.Player('player', {
				width: App.getContent().width(),
				height: App.getContent().height(),
				videoId: _video,
				playerVars: {
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