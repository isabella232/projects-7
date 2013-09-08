function WebyDashboard() {

	var $this = this;
	var _currentWebyId = '';
	var _loading = $('.modal-dialog .dialog-loading');
	var _template = kendo.template(
		'<div class="webies-list-item" style="position: relative;" data-id="${id}">' +
			'<img class="weby-thumbnail" src="${thumbnail}"/>' +
			'<div class="weby-data left">' +
			'<h2>${title}</h2>' +
			'<p><h3>Tags</h3>' +
			'<div class="weby-tags-list">' +
			'<span class="weby-tag">Metal</span>' +
			'<span class="weby-tag">Metal</span>' +
			'<span class="weby-tag">Progressive</span>' +
			'<span class="weby-tag">Math</span>' +
			'<span class="weby-tag">Math</span>' +
			'<span class="weby-tag">Math</span>' +
			'<span class="weby-tag">Math</span>' +
			'<span class="weby-tag">Math</span>' +
			'<span class="weby-tag">Math</span>' +
			'<span class="weby-tag">Math</span>' +
			'<span class="weby-tag">Math</span>' +
			'<span class="weby-tag">Math</span>' +

			'<a href="javascript:void(0);">' +
			'</a>' +
			'</div>' +
			'</p>' +
			'</div>' +
			'<div class="weby-actions right">' +
			'<p>${modified_on}</p>' +
			'<p>' +
			'<span class="weby-quick-data">${hits} hits</span>' +
			'<span class="weby-quick-data">${favorites} favorites</span>' +
			'</p>' +
			'</div>' +
			'<div class="weby-actions pushed-bot right">' +
			'<p style="">' +
			'<a href="javascript:void(0);"><span class="dialog-button delete">Delete</span></a>' +
			'<a href="${editor_url}"><span class="dialog-button edit">Edit</span></a>' +
			'<a href="${public_url}"><span class="dialog-button view">View</span></a>' +
			'</p>' +
			'</div>' +
			'</div>'
	);

	var webiesDataSource = new kendo.data.DataSource({
		type: "odata",
		serverPaging: true,
		pageSize: 2,
		transport: {
			read: {
				url: WEB + 'tools/webies/',
				contentType: "application/json; charset=utf-8",
				type: "GET",
				dataType: "jsonp"
			},
			destroy: {
				url: function () {
					return WEB + 'tools/delete-weby/' + _currentWebyId + '/'
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
				return response.webies;
			},
			total: function (response) {
				return response.count;
			}
		},
		requestStart: function (e) {
			_loading.css("display", "block");
		},
		requestEnd: function (e) {
			_loading.hide();
		}
	});

	$(".modal-dialog .webies-pager").kendoPager({
		dataSource: webiesDataSource,
		buttonCount: 5,
		info: false
	});


	$(".modal-dialog .webies-list").kendoListView({
		dataSource: webiesDataSource,
		template: _template
	});

	$('.webies-list').on('click', '.dialog-button.delete', function () {
		var item = $(this).closest('.webies-list-item');
		_currentWebyId = item.attr("data-id");
		webiesDataSource.remove(webiesDataSource.get(_currentWebyId));
		webiesDataSource.sync();
		webiesDataSource.read();
	});

	// Bind My Webies
	$("#my-webies").click(function (e) {
		e.preventDefault();
		$this.open();
	});

	this.open = function (modal) {
		if (typeof modal == "undefined") {
			modal = false;
		}

		$.fancybox($('#my-webies-dialog'), {
			modal: modal,
			type: 'inline',
			width: 772,
			height: 456,
			autoSize: false
		});
	}
}