/**
 * Transforms time into eg. "30 minutes ago" format (using timeago.js)
 * @constructor
 */
function TimePassed() {

    parse = function () {
        $("time.passed").timeago();
    };

    var init = function () {
        parse();
    };

    init();
}

$(function() {
    new TimePassed();
});
