var BaseWidget = function () {
	this._html;
	this._id;
	this._top;
	this._left;
	this._width;
	this._height;
	this._rotation;
	this._widgetClass;
	this._isDraggable = true;
	this._isResizable = true;
	this._isRotatable = true;
	this._isActive = false;
	this._isEditable = false;
	this._isLocked = false;
	this._isContentLoaded = false;
	this._zindex = 1;
	this._mouseUpAfterDrag = false;
	this._baseDraggableOptions = {
		//handle: '.drag-handle'
		cancel: '.resize-handle, .widget-body',
		containment: [117, 72],
		scroll: true,
		scrollSensitivity: 100,
		start: function (event, ui) {
			App.fireEvent("widget.drag.start", {element: $(this), event: event, ui: ui});
		},
		stop: function (event, ui) {
			event = MouseEvent.normalize(event);
			var $this = $(this).data('widget');
			$this._mouseUpAfterDrag = true;
			App.fireEvent("widget.drag.stop", {element: $(this), event: event, ui: ui});
		},
		drag: function (event, ui) {
			var $this = $(this).data('widget');
			event = MouseEvent.normalize(event);
			$this._left = event.offsetX;
			$this._top = event.offsetY;
			App.fireEvent("widget.drag", {element: $(this), event: event, ui: ui});
		}
	};
	this._baseRotatableOptions = {
		handle: '.rotate-handle',
		opacity: 0.01,
		helper: 'clone',
		drag: function (event, ui) {
			var $this = $(this).data('widget');
			var position = $this._rotateStart;
			var currRotate = $this.getRotationDegrees($(this));

			var diff = Math.abs(event.pageX - position);

			if (event.pageX > position) {
				degree = currRotate - diff;
			} else if (event.pageX < position) {
				degree = currRotate + diff;
			} else {
				return;
			}

			$this._rotateStart = event.pageX;
			var rotateCSS = 'rotate(' + degree + 'deg)';
			$this._rotation = degree;

			$(this).css({
				'transform': rotateCSS,
				'-webkit-transform': rotateCSS
			});
		},
		start: function (event, ui) {
			App.fireEvent("widget.rotate.start", {element: $(this), event: event, ui: ui});
		},
		stop: function (event, ui) {
			var $this = $(this).data('widget');
			App.fireEvent("widget.rotate.stop", {element: $(this), event: event, ui: ui});
			setTimeout(function () {
				$this._html.draggable("destroy");
				$this._html.draggable($this._baseDraggableOptions);
			}, 50);
		}
	};
	this._baseResizableOptions = {
		handles: {
			se: '.resize-handle'
		},
		resize: function (event, ui) {
			App.fireEvent("widget.resize", {element: $(this), event: event, ui: ui});
		},

		start: function (event, ui) {
			App.fireEvent("widget.resize.start", {element: $(this), event: event, ui: ui});
		},
		stop: function (event, ui) {
			App.fireEvent("widget.resize.stop", {element: $(this), event: event, ui: ui});
		}

	};
	this._draggableOptions = {};
	this._rotatableOptions = {};
	this._resizableOptions = {};
}

BaseWidget.prototype = {

	init: function () {
		$.extend(this._baseDraggableOptions, this._draggableOptions);
		$.extend(this._baseRotatableOptions, this._rotatableOptions);
		$.extend(this._baseResizableOptions, this._resizableOptions);
	},

	delete: function () {
		// Override if need to perform cleanup actions
		this._html.remove();
		App.removeWidget(this._id);
	},

	getId: function () {
		return this._id;
	},

	setId: function (id) {
		this._id = id;
		return this;
	},

	setPosition: function (x, y) {
		this._left = x;
		this._top = y;
		if (typeof this._html != "undefined") {
			this._html.css('top', this._top + 'px').css('left', this._left + 'px');
		}
		return this;
	},

	getHTML: function () {
		var $this = this;
		var _widget = $('<div data-id="' + this._id + '" class="widget"><div class="widget-body ' + this._widgetClass + '">' +
			'</div></div>');

		_widget.append('<div class="control remove-handle"><i class="icon-remove"></i></div>');
		_widget.find('.remove-handle').click(function () {
			$this.delete();
		});

		if (this._isDraggable) {
			_widget.append('<div class="control drag-handle"><i class="icon-move"></i></div>');
		}
		if (this._isResizable) {
			_widget.append('<div class="control resize-handle ui-resizable-handle"><i class="icon-crop"></i></div>');
		}
		if (this._isRotatable) {
			_widget.append('<div class="control rotate-handle"><i class="icon-undo"></i></div>');
		}

		_widget.find('.widget-body').append(this._html);
		_widget.attr('style', 'top: ' + this._top + 'px; left: ' + this._left + 'px; z-index: ' + this._zindex);
		this._html = _widget;
		this._html.find('.control').hide();
		return this._html;
	},

	onWidgetInserted: function () {
		var $this = this;
		if (this._isDraggable) {
			this._html.data('widget', this).draggable(this._baseDraggableOptions);
		}
		if (this._isResizable) {
			this._html.data('widget', this).resizable(this._baseResizableOptions);
		}

		if (this._isRotatable) {
			var $this = this;
			this._html.find('.rotate-handle').mousedown(function (e) {
				$this._rotateStart = e.pageX;
				$this._html.draggable("destroy");
				$this._html.data('widget', $this).draggable($this._baseRotatableOptions);
			}).mouseup(function () {
					setTimeout(function () {
						$this._html.draggable("destroy");
						$this._html.data('widget', $this).draggable($this._baseDraggableOptions);
					}, 50);
				}).dblclick(function () {
					$this._html.css('-webkit-transform', 'none').css('transform', 'none');;
				});
		}

		this.setZIndex(this.getNextZIndex());

		this._isEditable = true;
		this._html.click();

		/*

		 MOVE TO WIDGET TOOLBAR

		 this._html.find('.index-handle.up').click(function(){
		 $this.increaseZIndex();
		 });

		 this._html.find('.index-handle.down').click(function(){
		 $this.decreaseZIndex();
		 });

		 this._html.find('.lock-handle').click(function(){
		 if($this._locked){
		 $this.unlockWidget();
		 } else {
		 $this.lockWidget();
		 }
		 });*/

	},

	getRotationDegrees: function (obj) {
		var matrix = obj.css("-webkit-transform") ||
			obj.css("-moz-transform") ||
			obj.css("-ms-transform") ||
			obj.css("-o-transform") ||
			obj.css("transform");
		if (matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
		} else {
			var angle = 0;
		}
		return angle;
	},

	showResizeHandle: function () {
		if (this._isResizable && this._isEditable) {
			this._html.find('.resize-handle').show();
		}
	},

	hideResizeHandle: function () {
		this._html.find('.resize-handle').hide();
	},

	lockWidget: function () {
		this._html.find('.control').not('.lock-handle').hide();
		this._locked = true;
		this._html.find('.lock-handle i').removeClass('icon-unlock-alt').addClass('icon-lock');
	},

	unlockWidget: function () {
		this._html.find('.control').not('.lock-handle').show();
		this._locked = false;
		this._html.find('.lock-handle i').removeClass('icon-lock').addClass('icon-unlock-alt');
	},

	setZIndex: function (index) {
		this._zindex = index;
		this._html.css('z-index', index);
	},

	increaseZIndex: function () {
		this.setZIndex(this._zindex + 1);
	},

	decreaseZIndex: function () {
		if (this._zindex > 1) {
			this.setZIndex(this._zindex - 1);
		}
	},

	getNextZIndex: function () {
		var maxZ = 0;
		$('.widget').each(function () {
			var z = parseInt($(this).css('z-index'), 10);
			if (maxZ < z) {
				maxZ = z;
			}
		});
		return ++maxZ;
	},

	activate: function () {
		if (this._isActive) {
			return;
		}
		this._isActive = true;
		this._html.find('.control').show();
		if(!this._isContentLoaded){
			this.hideResizeHandle();
		}
		this._html.addClass('active');
		if(!this._isContentLoaded){
			this.makeEditable();
		}

		if('onActivate' in this){
			this.onActivate();
		}
	},

	makeEditable: function () {
		this._isEditable = true;
		this._html.find('.widget-disabled-overlay').remove();
		this._html.addClass('editable');

		if('onMakeEditable' in this){
			this.onMakeEditable();
		}
	},

	deactivate: function () {
		this._isActive = this._isEditable = false;
		this._html.find('.control').hide();
		this._html.removeClass('active');
		this._html.removeClass('editable');
		if (this._html.find('.widget-disabled-overlay').length === 0) {
			this._html.prepend('<div class="widget-disabled-overlay"><span class="text">Doubleclick to edit</span></div>');
			this.resize();
		}
	},

	resize: function () {
		this._html.find('span.text').css('line-height', this._html.outerHeight() + 'px');
	},

	widgetResizeStop: function (data) {
		this._width = data.element.width();
		this._height = data.element.height();
	},

	widgetDragStop: function (data) {
		this._top = data.element.css('top').replace('px','');
		this._left = data.element.css('left').replace('px', '');
	}
};