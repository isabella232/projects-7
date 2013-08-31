function WebyDashboard() {

    var $this = this;

    var webiesDataSource = new kendo.data.DataSource({
        data: myWebies,
        pageSize: 3
    });

    $("#webiesPager").kendoPager({
        dataSource: webiesDataSource,
        buttonCount: 5
    });

    // TODO: move this HTML to another place because it got really big
    $("#webiesList").kendoListView({
        dataSource: webiesDataSource,
        template: kendo.template(
            '<div class="webies-list-item">' +
                '<img class="weby-thumbnail" src="${thumbnail}"/>' +
                '<div class="weby-data left">' +
                    '<h2>${title}</h2>' +
                    '<p><h3>Tags</h3>' +
                        '<span class="weby-tag">Metal</span>' +
                        '<span class="weby-tag">Progressive</span>' +
                        '<span class="weby-tag">Epic</span>' +
                    '</p>' +
                '</div>' +
                '<div class="weby-actions right">' +
                    '<p>Edited: ${modified_on}</p>' +
                    '<p>' +
                        '<a href="javascript:void(0);"><span class="dialog-button delete">Delete</span></a>' +
                        '<a href="${editor_url}"><span class="dialog-button edit">Edit</span></a>' +
                        '<a href="${public_url}"><span class="dialog-button view">View</span></a>' +
                    '</p>' +
                '</div>' +
            '</div>'
        )
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
            width: 550,
            height: 380,
            autoSize: false
        });
    }
}