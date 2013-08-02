function FileWidget() {

    this._widgetClass = 'file-widget';

    this._resizableOptions = {
        minHeight: 100,
        minWidth: 200,
        resize: function (event, ui) {
            var $this = $(this).data('widget');
            var _widget = $this._html;

            _widget.find('.content-resizable').width(_widget.width() - 12);
            _widget.find('.content-resizable').width(_widget.width()).height(_widget.height() - 5);
        },
        stop: function (event, ui) {
            App.fireEvent("widget.resize.stop", {element: $(this), event: event, ui: ui});
            _centerMarker();
        }
    };

    this.init = function () {
        BaseWidget.prototype.init.call(this);
    };

    this.getHTML = function () {

        this._html = '<form method="post">' +
            '<input type="text" placeholder="Paste a link to file or drag a file..."/>' +
            '<span class="message"></span>' +
            '<input name="file" id="files" type="file"/>' +
            '</form>';
        return BaseWidget.prototype.getHTML.call(this);
    };

    this.onWidgetInserted = function () {
        BaseWidget.prototype.onWidgetInserted.call(this);
        this.hideResizeHandle();

        var currentWidget = this;

        // Apply upload widget functionality
        $("#content").kendoUpload({
            showFileList: false,
            async: {
                saveUrl: "http://weby.loc/files/upload/",
                autoUpload: true
            },
            success: function (r) {
                currentWidget._html.find('form').remove();
                var data = r.response.data;
                var content = currentWidget.generateContent(data.type, data.src);
                currentWidget._html.find('.widget-body').append(content);
                currentWidget.showResizeHandle();
            }
        });

        // Getting links
        this._html.find('input[type="text"]').blur(function () {
            if ($(this).val() != '') {
                currentWidget._html.find('form').remove();
                var type = $(this).val().match(/.+\.([^?]+)(\?|$)/)[1];
                var content = currentWidget.generateContent(type, $(this).val());
                currentWidget._html.find('.widget-body').append(content);
                currentWidget.showResizeHandle();
            }
        });

        BaseWidget.prototype.onWidgetInserted.call(this);

        App.deactivateTool();
    };

    this.generateContent = function (template, src) {
        var tpl = $('script[type="webyio/tpl"]#' + template).html();
        tpl = tpl.replace('{src}', src);
        return tpl;
    };

    BaseWidget.prototype.init.call(this);
}

FileWidget.prototype = new BaseWidget();
FileWidget.prototype.constructor = FileWidget;