function ListingClass() {

    var _loadMoreWebies = function (tag, page) {
        $.ajax({
            url: WEB + 'tag/' + tag + '/' + page,
            method: 'post',
            data: {json: true},
            success: function () {
            }
        });
    }

    this.load = function (tag, page) {
        _loadMoreWebies(tag, page);
    }
}

$(function () {
    Listing = new ListingClass;
});
