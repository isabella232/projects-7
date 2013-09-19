/**
 * Transforms time into eg. "30 minutes ago" format (using timeago.js)
 * @constructor
 */
TimePassed = {
    parse: function () {
        $("time.passed").timeago();
    }
}

$(function () {
    TimePassed.parse();
});
