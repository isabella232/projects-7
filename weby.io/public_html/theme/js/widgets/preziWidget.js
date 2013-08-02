function PreziWidget() {

	this._widgetClass = 'prezi-widget';

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
		this._html = '<input type="text" placeholder="Paste a Prezi embed iframe or embed URL"/>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		var $this = this;

		BaseWidget.prototype.onWidgetInserted.call(this);

		this.hideResizeHandle();

		this._html.find('input').blur(function(){
			if($(this).val() != ''){
				var iframe = $this.parsePreziLink($(this).val())

				if(!iframe){
					$this._html.find('.message').html('We couldn\'t insert your presentation. Please try a different one.');
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

	this.parsePreziLink = function(link){
		var original = link;
		var width = 550;
		var height = 400;
		if(link.indexOf('iframe') >= 0){
			var regex = /src="(.*?)"/;
			link = original.match(regex) ? RegExp.$1 : false;
			width = original.match(/width="?(\d+)"?/) ? RegExp.$1 : width;
			height = original.match(/height="?(\d+)"?/) ? RegExp.$1 : height;
		}
		// Validate link
		var regex = /https?:\/\/(?:www\.)?prezi.com\/embed\/(.*?)\/(.*)$/;
		if(link.match(regex)){
			var id = 'prezi-iframe-'+ this._id;
			this._html.resizable("option", "alsoResize", "#"+id);
			this.setResizableAspectRatio(width/height);
			return '<iframe id="'+id+'" src="'+link+'" width="'+width+'" height="'+height+'" frameBorder="0"></iframe>';
		}
		return  false;
	}

	// http://prezi.com/embed/f2eb2757342dc679050f1d1d6b098920375ffd86/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;features=undefined&amp;disabled_features=undefined
	BaseWidget.prototype.init.call(this);
}

PreziWidget.prototype = new BaseWidget();
PreziWidget.prototype.constructor = PreziWidget;