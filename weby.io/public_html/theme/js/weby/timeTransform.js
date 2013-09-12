/**
 * Transforms time into eg. "30 minutes ago" format (using timeago.js)
 * @constructor
 */
function TimePassed() {

    transform = function () {
        $("time.passed").timeago();
    };

    init = function () {
        transform();
    };

    init();
}