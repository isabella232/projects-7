function LinkedInWidget() {

	this._isResizable = false;
	this._widgetClass = 'linkedin-widget';

	this.getHTML = function () {
		this._html = '<input type="text" placeholder="Enter a public profile URL of a LinkedIn member"/>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		var $this = this;

		BaseWidget.prototype.onWidgetInserted.call(this);

		this._html.find('input').blur(function () {
			if ($(this).val() != '') {
				var name = $this.parseLinkedInLink($(this).val());
				if (name == '') {
					$this._html.find('.message').html('We couldn\'t insert the given profile. Please try a different one.');
					$(this).val('').focus();
					return;
				}

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'http://wf.com/Weby.io/js/in.js';
				$('head',document).append( script );

				var script = document.createElement('script');
				script.type = 'IN/MemberProfile';
				script.setAttribute("data-id", "http://www.linkedin.com/in/"+name);
				script.setAttribute("data-format", "inline");
				script.setAttribute("data-related", false);

				$(this).replaceWith(script);
				$this.showResizeHandle();
				$this._html.draggable($this._baseDraggableOptions);
				$this._html.find('.message').remove();
				$this._html.css('padding-bottom', 0);
			}
		});

		App.deactivateTool();
		this._html.find('input').focus();
	}

	this.parseLinkedInLink = function (link) {
		var regex = /http:\/\/www\.linkedin\.com\/in\/(\S+)/;
		var name = link.match(regex) ? RegExp.$1 : link;
		return name;
	}

	BaseWidget.prototype.init.call(this);
}


LinkedInWidget.prototype = new BaseWidget();
LinkedInWidget.prototype.constructor = LinkedInWidget;
