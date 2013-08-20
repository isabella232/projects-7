function VineWidget() {

    this._vineId = '';
    this._widgetClass = 'vine-widget';
	this._isResizable = false;
    this._parseErrorMessage = 'We couldn\'t insert your postcard. Please try a different one.';
    this._inputElement = 'textarea';
    this._loadingMessage = 'Loading your Vine postcard...';
	this._customOnLoadHandler = 'onIframeLoaded';

    this.getHTML = function () {
        this._html = '<textarea type="text" placeholder="Paste an Vine embed code or a Vine URL">https://vine.co/v/bHVuvrKAmg1/embed</textarea>' +
            '<span class="message"></span>';
        return BaseIframeWidget.prototype.getHTML.call(this);
    };

    this.getIframe = function () {
        var id = 'vine-iframe-' + this._id;
		this._embedUrl = WEB+'embed/vine/?vineId='+this._vineId;
        return '<iframe id="'+id+'" class="vine-embed" src="'+this._embedUrl+'" width="320" height="420" frameborder="0"></iframe>';
    }

    // This is called to construct an embed URL which will then be validated
    this.getTargetUrl = function (inputValue) {
        var parser = new VineParser();
        if((this._vineId = parser.parse(inputValue))){
            return 'https://vine.co/v/'+this._vineId+'/embed';
        }
        return false;
    }

	/**
	 * Listen for iframe width/height change and update main iframe
	 * @param jFrame Iframe object
	 */
	this.onIframeLoaded = function(jFrame){
		var $this = this;
		jFrame.bind("load", function(){
			var childIframe = jFrame.contents().find('iframe');
			var counter = 200;
			var interval = setInterval(function(){
				// Fail safe switch to stop interval if it does more than 200 checks
				if (counter == 0) {
					clearInterval(interval);
					$this.hideLoading();
					return;
				}
				counter--;

				if(childIframe.hasClass("loaded")){
					clearInterval(interval);
					jFrame.attr("width", childIframe.attr("width"));
					jFrame.attr("height", childIframe.attr("height"));
					$this.hideLoading();
					$this.contentLoaded();
					$this.body().css("margin-bottom", "-14px");
				}
			}, 50);
		});
	}

	/**
	 * EDIT methods
	 */
	this.getSaveData = function(){
		return {
			vineId: this._vineId
		}
	};
}

VineWidget.prototype = new BaseIframeWidget();
VineWidget.prototype.constructor = VineWidget;