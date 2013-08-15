function FacebookWidget() {

    this._facebookUrl = '';
    this._isResizable = false;
    this._widgetClass = 'facebook-widget';
    this._parseErrorMessage = 'We couldn\'t insert your Facebook feed. Please try a different one.';
    this._inputElement = 'textarea';
    this._loadingMessage = 'Loading your Facebook feed...';

    this.getHTML = function () {
        this._html = '<textarea type="text" placeholder="Paste your Facebook page URL">www.facebook.com/webiny</textarea>' +
            '<span class="message"></span>';
        return BaseIframeWidget.prototype.getHTML.call(this);
    };

    this.getIframe = function () {
        var id = 'facebook-iframe-' + this._id;
        this._embedUrl = '//www.facebook.com/plugins/likebox.php?href=https://www.facebook.com/' + this._facebookUrl;
        return '<iframe id="' + id + '" src="' + this._embedUrl +
            '&amp;width=292&amp;height=427&amp;colorscheme=light&amp;show_faces=false&amp;header=true&amp;' +
            'stream=true&amp;show_border=false&amp;appId=276232862515995" scrolling="no" frameborder="0" ' +
            'style="display: none; border:none; overflow:hidden; width:292px; height:427px;" width="292" height="427" ' +
			'allowTransparency="true"></iframe>';
    }

    // This is called to construct an embed URL which will then be validated
    this.getTargetUrl = function (inputValue) {
        var parser = new FacebookParser();
        if((this._facebookUrl = parser.parse(inputValue))){
            return 'http://graph.facebook.com/?id=' + this._facebookUrl + '&t=' + new Date().getTime();
        }
        return false;

    }

    this.onContentLoaded = function() {
        this._html.find('iframe').show();
    }

	this.getSaveData = function(){
		return {
			facebookUrl: this._facebookUrl
		}
	}

	this.getEditHTML = function () {
		this._html = $(this.getIframe()).show();
		return BaseWidget.prototype.getHTML.call(this);
	};

    BaseIframeWidget.prototype.init.call(this);
}

FacebookWidget.prototype = new BaseIframeWidget();
FacebookWidget.prototype.constructor = FacebookWidget;