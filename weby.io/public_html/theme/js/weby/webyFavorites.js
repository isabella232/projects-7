function WebyFavorites() {

    var $this = this;
    var favoritesOpen = $('#user-favorites');

    var webiesDataSource = new kendo.data.DataSource({
        data: myFavoriteWebies,
        pageSize: 3
    });

    $("#favoritesPager").kendoPager({
        dataSource: webiesDataSource,
        buttonCount: 5
    });

    // TODO: move this HTML to another place because it got really big
    $("#favoritesList").kendoListView({
        dataSource: webiesDataSource,
        template: kendo.template(
            '<div class="webies-list-item" style="position: relative;">' +
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
                            '<span class="weby-tag">Power</span>' +
                            '<span class="weby-tag">Power</span>' +
                            '<span class="weby-tag">Power</span>' +
                            '<span class="weby-tag">Power</span>' +
                            '<a href="javascript:void(0);">' +
                            '</a>' +
                        '</div>' +
                    '</p>' +
                '</div>' +
                '<div class="weby-actions right">' +
                    '<p>Added ${addedToFavoritesTime}</p>' +
                    '<p>' +
                        '<span class="weby-quick-data">${hits} hits</span>' +
                        '<span class="weby-quick-data">${favorites} favorites</span>' +
                    '</p>' +
                '</div>' +
                '<div class="weby-actions pushed-bot right">' +
                    '<p style="">' +
                    '<a href="${public_url}"><span class="dialog-button view">View</span></a>' +
                    '</p>' +
                '</div>' +
            '</div>'
        )
    });

    // Bind My Webies
    favoritesOpen.click(function (e) {
        e.preventDefault();
        $this.open();
    });

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