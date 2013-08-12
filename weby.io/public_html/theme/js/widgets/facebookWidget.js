function FacebookWidget() {

    this._facebookURL = false;
    this._height = 400;
    this._width = 200;
    this._isResizable = false;
    this._widgetClass = 'facebook-widget';
    this._resizableOptions['minWidth'] = 400;
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
        this._embedUrl = '//www.facebook.com/plugins/likebox.php?href=https://www.facebook.com/' + this._facebookURL;
        return '<iframe id="' + id + '" src="' + this._embedUrl +
            '&amp;width=292&amp;height=427&amp;colorscheme=light&amp;show_faces=false&amp;header=true&amp;' +
            'stream=true&amp;show_border=false&amp;appId=276232862515995" scrolling="no" frameborder="0" ' +
            'style="display: none; border:none; overflow:hidden; width:292px; height:427px;" allowTransparency="true">' +
            '</iframe>';
    }

    // This is called to construct an embed URL which will then be validated
    this.getTargetUrl = function (inputValue) {
        var parser = new FacebookParser();
        var $this = this;
        if((this._facebookURL = parser.parse(inputValue))){
          /*  $.ajax({
                type: "GET",
                url: 'http://graph.facebook.com/?id=' + this._facebookURL,
                beforeSend: function () {
                    body.html('Loading....');
                },
                success: function (r) {
                    if (r.urlExists) {

                    }
                }
            });*/

            return 'http://graph.facebook.com/?id=' + this._facebookURL + '&t=' + new Date().getTime();
        }
        return false;

    }

    this.onContentLoaded = function() {
        this._html.find('iframe').show();
    }

    BaseIframeWidget.prototype.init.call(this);
}

FacebookWidget.prototype = new BaseIframeWidget();
FacebookWidget.prototype.constructor = FacebookWidget;