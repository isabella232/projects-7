function SoundCloudWidget() {

	this._widgetClass = 'soundcloud-widget';
	this._parseErrorMessage = 'We couldn\'t insert the given URL. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your sound...';

	this._resizableOptions['minHeight'] = 166;
	this._resizableOptions['maxHeight'] = 166;
	this._resizableOptions['minWidth'] = 300;

	this.getHTML = function () {
		this._html = '<textarea type="text" placeholder="Paste a SoundCloud embed code">'+test+'</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function(input){
		var embedLink = this.parseSoundCloudLink(input)
		var iframe = false;
		var id = 'soundcloud-iframe-'+ this._id;
		this._alsoResize = '#'+id;
		if(embedLink){
			iframe = '<iframe id="' + id + '" src="' + embedLink + '" width="300" height="166" scrolling="no" frameborder="0"></iframe>';
		}
		return iframe;
	}

	this.parseSoundCloudLink = function (link) {
		var original = link;
		if (link.indexOf('iframe') >= 0) {
			var regex = /src=['|"](.*?)['|"]/;
			link = original.match(regex) ? RegExp.$1 : false;
			return link.replace('auto_play=true', 'auto_play=false')

		}
		return false;
	}

	BaseIframeWidget.prototype.init.call(this);

	var test = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F70703171&amp;color=ff0000&amp;auto_play=true&amp;show_artwork=false"></iframe>';
}

SoundCloudWidget.prototype = new BaseIframeWidget();
SoundCloudWidget.prototype.constructor = SoundCloudWidget;