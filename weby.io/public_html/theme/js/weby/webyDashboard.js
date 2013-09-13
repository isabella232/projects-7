function DashboardLoading() {
    var _el = $('#my-webies-dialog');
    var _initialMessage = 'Loading Webies...';

    this.show = function () {
        _el.css("display", "block");
        return this;
    }

    this.hide = function () {
        _el.hide();
        return this;
    }

    this.setMessage = function (message) {
        _el.find('.text').html(message);
        return this;
    }

    this.setMessage(_initialMessage);
}

function WebyDashboard() {

    var $this = this;
    var _currentWebyId = '';
    var _dialog = $("#my-webies-dialog");
    var _deleteDialog = $('.delete-confirmation');
    var _loading = new DashboardLoading();
    var _template = kendo.template($('#webies-list-item-tpl').html());

    var webiesDataSource = new kendo.data.DataSource({
        type: "odata",
        serverPaging: true,
        pageSize: 3,
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
            _loading.show();
        },
        requestEnd: function (e) {
            _loading.hide().setMessage("Loading Webies...");
            if (e.type == "destroy") {
                if (this.data().length == 0) {
                    var curPage = this.page();
                    if (curPage > 1) {
                        this.page(--curPage);
                    } else {
                        _dialog.find(".empty-list").show();
                        _dialog.find("h1").hide();
                        _dialog.find(".webies-pager").hide();
                    }
                } else {
                    this.read();
                }
            }
        }
    });

    _dialog.find('.webies-pager').kendoPager({
        dataSource: webiesDataSource,
        buttonCount: 10,
        info: false,
        change: function () {
            // TODO: Transform time
        }
    });


    _dialog.find('.webies-pager').kendoListView({
        dataSource: webiesDataSource,
        template: _template,
        change: function () {
            // TODO: Transform time
        }
    });

    _deleteDialog.find('[data-role="btn-cancel"]').click(function () {
        _deleteDialog.hide();
    });

    _deleteDialog.find('[data-role="btn-delete"]').click(function () {
        _deleteDialog.hide();
        webiesDataSource.remove(webiesDataSource.get(_currentWebyId));
        _loading.setMessage("Removing Weby...");
        webiesDataSource.sync();
    });

    $('.webies-list').on('click', '.dialog-button.delete', function () {
        var item = $(this).closest('.webies-list-item');
        _currentWebyId = item.attr("data-id");
        _deleteDialog.show();
    });

    // Bind My Webies
    $('[data-role="my-webies"]').click(function (e) {
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