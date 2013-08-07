function SlideShareWidget() {

	this._widgetClass = 'slideshare-widget';

	this._resizableOptions = {
		aspectRatio: 5.5 / 4,
		start: function(event, ui){
			$(this).find('.widget-body').prepend('<div class="overlay"></div>');
			App.fireEvent("widget.resize.start", {element: $(this), event: event, ui: ui});
		},
		stop: function(event, ui){
			App.fireEvent("widget.resize.stop", {element: $(this), event: event, ui: ui});
			$(this).find('.overlay').remove();
			$(this).css('height', 'auto');
		},
		resize: function(event, ui){
			$(this).find('.overlay').css('height', $(this).height()).css('width', $(this).width());
		}
	};

	this.getHTML = function () {
		this._html = '<input type="text" placeholder="Paste a Slideshare ID, embed URL or an iframe code" value="'+test+'"/>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		var $this = this;

		BaseWidget.prototype.onWidgetInserted.call(this);

		this.hideResizeHandle();

		this._html.find('input').blur(function(){
			if($(this).val() != ''){
				var iframe = $this.parseSlideShareLink($(this).val())

				if(!iframe){
					$this._html.find('.message').html('We couldn\'t insert your slideshow. Please try a different one.');
					$(this).val('').focus();
					return;
				}

				$(this).replaceWith(iframe);
				$this.showResizeHandle();
				$this._html.draggable($this._baseDraggableOptions);
				$this._html.find('.message').remove();
				$this._html.css('padding-bottom', 0);

				App.fireEvent("widget.resize.stop", {element: $this._html});
			}
		});

		App.deactivateTool();
		this._html.find('input').focus();
	};

	this.parseSlideShareLink = function(link){
		var original = link;
		var width = 429;
		var height = 357;
		if(link.indexOf('iframe') >= 0){
			var regex = /src="(.*?)"/;
			link = original.match(regex) ? RegExp.$1 : false;
			width = original.match(/width="?(\d+)"?/) ? RegExp.$1 : width;
			height = original.match(/height="?(\d+)"?/) ? RegExp.$1 : height;
		}

		if(link.match(/^\d+$/)){
			link = 'http://www.slideshare.net/slideshow/embed_code/'+link;
		} else {
			// Validate link
			var regex = /http:\/\/www\.slideshare.net\/slideshow\/embed_code\/\d+.*$/;
			if(!link.match(regex)){
				return false;
			}
		}
		var id = 'slideshare-iframe-'+ this._id;
		this._html.resizable("option", "alsoResize", "#"+id);
		this.setResizableAspectRatio(width/height);
		return '<iframe id="'+id+'" src="'+link+'" width="'+width+'" height="'+height+'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
	}

	var test = '24621277';
	BaseWidget.prototype.init.call(this);
}

SlideShareWidget.prototype = new BaseWidget();
SlideShareWidget.prototype.constructor = SlideShareWidget;