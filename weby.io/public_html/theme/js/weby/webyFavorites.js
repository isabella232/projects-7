function FavoritesLoading(){
	var _el = $('#my-favorites-dialog .dialog-loading');
	var _initialMessage = 'Loading favorites...';

	this.show = function(){
		_el.css("display", "block");
		return this;
	}

	this.hide = function(){
		_el.hide();
		return this;
	}

	this.setMessage = function(message){
		_el.find('.text').html(message);
		return this;
	}

	this.setMessage(_initialMessage);
}

function WebyFavorites() {

	var $this = this;
	var _currentWebyId = '';
	var _dialog = $("#my-favorites-dialog");
	var _deleteDialog = $('.delete-confirmation');
	var _loading = new FavoritesLoading();
	var _template = kendo.template($('#favorites-list-item-tpl').html());

	var favoritesDataSource = new kendo.data.DataSource({
		type: "odata",
		serverPaging: true,
		pageSize: 3,
		transport: {
			read: {
				url: WEB + 'tools/favorites/',
				contentType: "application/json; charset=utf-8",
				type: "GET",
				dataType: "jsonp"
			},
			destroy: {
				url: function () {
					return WEB + 'tools/favorite/' + _currentWebyId + '/'
				},
				dataType: "json",
				type: "POST"
			}
		},
		schema: {
			model: kendo.data.Model.define({
				id: "id"
			}),
			data: function (response) {
				return response.favorites;
			},
			total: function (response) {
				return response.count;
			}
		},
		requestStart: function (e) {
			_loading.show();
		},
		requestEnd: function (e) {
			_loading.hide().setMessage("Loading favorites...");
			if(e.type == "destroy"){
				if(this.data().length == 0){
					var curPage = this.page();
					if(curPage > 1){
						this.page(--curPage);
					} else {
						_dialog.find(".empty-list").show();
						_dialog.find("h1").hide();
						_dialog.find(".favorites-pager").hide();
					}
				} else {
					this.read();
				}
			}
		}
	});

	$("#my-favorites-dialog .favorites-pager").kendoPager({
		dataSource: favoritesDataSource,
		buttonCount: 10,
		info: false
	});

	$("#my-favorites-dialog .favorites-list").kendoListView({
		dataSource: favoritesDataSource,
		template: _template
	});

	_deleteDialog.find('[data-role="fav-btn-cancel"]').click(function(){
		_deleteDialog.hide();
	});

	_deleteDialog.find('[data-role="fav-btn-delete"]').click(function(){
		_deleteDialog.hide();
		favoritesDataSource.remove(favoritesDataSource.get(_currentWebyId));
		_loading.setMessage("Removing Weby from favorites...");
		favoritesDataSource.sync();
	});

    $('#my-favorites-dialog .favorites-list').on('click', '.dialog-button.delete', function () {
        var item = $(this).closest('.favorites-list-item');
        _currentWebyId = item.attr("data-id");
        _deleteDialog.show();
    });

	// Bind 'My Favorites' dialog
	$('[data-role="my-favorites"]').click(function (e) {
		e.preventDefault();
		$this.open();
	});

    // Opens dialog
	this.open = function (modal) {
		if (typeof modal == "undefined") {
			modal = false;
		}

		$.fancybox($('#my-favorites-dialog'), {
			modal: modal,
			type: 'inline',
			width: 772,
			height: 456,
			autoSize: false
		});
	}
}