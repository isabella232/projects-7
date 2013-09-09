function WebySave() {
	var _el = $('[data-role="weby-save"]');

	this.setMessage = function (message) {
		_el.find('p').html(message);
		return this;
	}

	this.show = function () {
		_el.show();
		return this;
	}

	this.hide = function () {
		_el.fadeOut(function(){
			_el.hide();
		});
		return this;
	}

}