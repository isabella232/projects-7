var SoundCloudParser = function () {

	this._trackId;
	this._color;

	this._parse = function (data) {
		data = data.replace(new RegExp("%2F", "g"), '/');
		data = data.replace(new RegExp("%3A", "g"), ':');

		if (data.indexOf('iframe') >= 0) {
			var regex = /src=['|"](.*?)['|"]/;
			data = data.match(regex) ? RegExp.$1 : false;
		}

		// Validate data
        var regex = /w\.soundcloud\.com\/player\/\?url=\S+api\.soundcloud\.com\/tracks\/(\d+)/;
		this._trackId = data.match(regex) ? RegExp.$1 : false;

		if(this._trackId){
			regex = /color\=([a-z0-9]{6})/;
			this._color = data.match(regex) ? RegExp.$1 : 'ff0000';
		}

		return this._trackId;
	}

	this.getTrackId = function(){
		return this._trackId;
	}

	this.getColor = function(){
		return this._color;
	}

	this.getShowArtwork = function(){
		return this._showArtwork;
	}
}

SoundCloudParser.prototype = new BaseParser();
SoundCloudParser.prototype.constructor = SoundCloudParser;