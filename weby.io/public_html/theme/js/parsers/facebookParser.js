var FacebookParser = function () {

    this.parse = function (data) {
        BaseParser.prototype.parse.call(this, data);

        // Firstly, check if user typed an adress that had a query (facebook.com/Webiny?ref=br_tf)
        var regex = /facebook.com\/(.*?)\?.*$/;
        var fbUrl = data.match(regex) ? RegExp.$1 : false;
        if (!fbUrl) {
            // Then, check for normal URL's (eg. facebook.com/webiny)
            regex = /facebook.com\/(.*?)$/;
            fbUrl = data.match(regex) ? RegExp.$1 : false;
        }
        return fbUrl;
    }
}

FacebookParser.prototype = new BaseParser();
FacebookParser.prototype.constructor = FacebookParser;