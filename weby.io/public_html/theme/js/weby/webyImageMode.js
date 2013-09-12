function WebyImageMode(){

	App.addEventListener(this);

	var $this = this;
	var _mode = $('#canvas-image-mode');
	var _align = $('#canvas-image-align');

	var _currentMode = '';
	var _currentAlignment = '';

	/**
	 * Set selected mode
	 */
	this.setMode = function(mode){
		if(_currentMode == mode){
			return this;
		}
		_currentMode = mode;
		var el = _mode.find('[data-mode="'+mode+'"]');
		_mode.find('a').first().html(el.html());
		_mode.find('ul').hide();

		if(mode == 'aligned'){
			_align.show();
		} else {
			_align.hide();
		}
		return this;
	}

	/**
	 * Set selected alignment
	 */
	this.setAlignment = function(alignment){
		if(_currentAlignment == alignment){
			return this;
		}
		_currentAlignment = alignment;
		var el = _align.find('[data-align="'+alignment+'"]');
		_align.find('a').first().html(el.html());
		_align.find('ul').hide();
		return this;
	}

	this.render = function(){
		App.getWeby().getBackground().setImageMode(_currentMode).setImageAlign(_currentAlignment).render();
	}

	this.show = function(){
		_mode.show();
		_align.show();
	}

	this.hide = function(){
		_mode.hide();
		_align.hide();
	}

	_mode.find('a').first().click(function(){
		_mode.find('ul').toggle();
		_align.find('ul').hide();
	});

	_mode.find('ul a').click(function(){
		$this.setMode($(this).attr("data-mode")).render();
	});

	_align.find('a').first().click(function(){
		_align.find('ul').toggle();
		_mode.find('ul').hide();
	});

	_align.find('ul a').click(function(){
		$this.setAlignment($(this).attr("data-align")).render();
	});

	this.setMode(App.getWeby().getBackground().getImageMode(), false);
	this.setAlignment(App.getWeby().getBackground().getImageAlign(), false);
	if(App.getWeby().getBackground().getImage() == null){
		this.hide();
	}


	/**
	 * EVENTS
	 */

	this.contentClick = function(){
		_align.find('ul').hide();
		_mode.find('ul').hide();
	}
}