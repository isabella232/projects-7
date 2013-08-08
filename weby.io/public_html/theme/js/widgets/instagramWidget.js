function InstagramWidget() {

    this._widgetClass = 'instagram-widget';
    this._resizableOptions['minWidth'] = 300;
    this._resizableOptions['minHeight'] = 300;
    this._parseErrorMessage = 'We couldn\'t insert your image. Please try a different one.';
    this._inputElement = 'textarea';
    this._loadingMessage = 'Loading your Instagram image...';

    this.getHTML = function () {
        this._html = '<textarea type="text" placeholder="Paste a Instagram embed code"></textarea>' +
            '<span class="message"></span>';
        return BaseIframeWidget.prototype.getHTML.call(this);
    };

    this.getIframe = function (input) {
        return this.parseInstagramLink(input);
    }

    this.parseInstagramLink = function (link) {
        var original = link;
        var width = 402;
        var height = 327;
        if (link.indexOf('iframe') >= 0) {
            // Iframe embed

            var regex = /src=['|"]\/\/instagram.com\/p\/(.*?)\/embed\/['|"]/;
            var linkId = original.match(regex) ? RegExp.$1 : false;
            var width = original.match(/width="?(\d+)"?/) ? RegExp.$1 : width;
            var height = original.match(/height="?(\d+)"?/) ? RegExp.$1 : height;

        } else {
            // Document link
            link = link.replace('/pub', '/embed');
        }

        var id = 'instagram-iframe-' + this._id;
        this._html.resizable("option", "alsoResize", "#" + id);
        return '<iframe id="' + id + '" src="//instagram.com/p/' + linkId + '/embed/" width="' + width + '" height="' + height + '" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
    }

    BaseIframeWidget.prototype.init.call(this);
}

InstagramWidget.prototype = new BaseIframeWidget();
InstagramWidget.prototype.constructor = InstagramWidget;