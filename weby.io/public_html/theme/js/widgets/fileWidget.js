function FileWidget() {

    this._widgetClass = 'file-widget';

    this._url;
    this._fileName;
    this._contentType;
    this._contentSize;
    this._host;
    this._resizableOptions = {
        minHeight: 100,
        minWidth: 200,
        resize: function () {
            var $this = $(this).data('widget');
            var _widget = $this._html;

            _widget.find('.file-widget-image').width(_widget.width() - 12);
            _widget.find('.file-widget-image').width(_widget.width()).height(_widget.height() - 5);
        },
        stop: function (event, ui) {
            App.fireEvent("widget.resize.stop", {element: $(this), event: event, ui: ui});
        }
    };

    this.init = function () {
        BaseWidget.prototype.init.call(this);
    };

    this.getHTML = function () {
        this._html = this.generateInputField('');
        return BaseWidget.prototype.getHTML.call(this);
    };

    this.onWidgetInserted = function () {

        var body = this._html.find('div.widget-body');

        BaseWidget.prototype.onWidgetInserted.call(this);

        // hide resize handle because we don't want to be able to resize eg. newly created widget
        this.hideResizeHandle();

        // Binds link parsing on blur of input filed
        this._inputFieldBind(this, body);

        // Bind event on Dropbox button
        this._bindDropBoxChooser(this, body);

        // Bind event on Google Drive button
        this._bindGoogleDriveChooser(this, body);


        // Focus on newly created widget (default input field)
        this._html.find("input.file-widget-field").focus();

        App.deactivateTool();

    };


    // This binds (URL based) data retrival to default input field of file widget
    this._inputFieldBind = function (currentWidget, body) {

        // Getting links
        body.on('blur', 'input[type="text"]', function () {
            var linkField = $(this);
            if (linkField.val() != '') {

                $.ajax({
                    type: "GET",
                    url: currentWidget._urlChecker + '/?url=' + linkField.val(),
                    beforeSend: function () {
                        body.html('Loading....');
                    },
                    success: function (r) {
                        if (r.urlExists) {
                            // Okay, we got HEAD information, no let's see if it is an allowed filetype
                            if (typeof FileTool.ALLOWED_TYPES[r.data['content-type']] != 'undefined') {

                                // If requested file is a html page
                                if(FileTool.ALLOWED_TYPES[r.data['content-type']] == 'text/html') {
                                    $.ajax({
                                        type: "GET",
                                        url: 'weby.loc',
                                        beforeSend: function () {
                                        },
                                        success: function (r) {
                                        }
                                    });
                                }
                                // Save data in properties of widget
                                currentWidget._url = linkField.val();
                                currentWidget._host = r.data['host'];
                                currentWidget._fileName = r.data['file-name'];
                                currentWidget._contentType = r.data['content-type'];
                                currentWidget._contentSize = r.data['content-length'];

                                // Firstly, remove link field - we won't be needing this when showing our weby
                                linkField.remove();
                                // Method name is being built by template name
                                var content = currentWidget['generate' + FileTool.ALLOWED_TYPES[r.data['content-type']]['tpl']]();
                                // Append content
                                body.html(content);
                            } else {
                                // If not allowed filetype, then bring back input field and genereate an error msg
                                body.html(currentWidget.generateErrorInfo('Unsupported file type.'));
                                body.prepend(currentWidget.generateInputField(linkField.val()));
                            }
                        } else {
                            // If there was an error in requesting information about the link (server side), then return an error msg
                            var content = currentWidget.generateErrorInfo('We could not get your URL, please check!');
                            body.html(content);
                            body.prepend(currentWidget.generateInputField(linkField.val()));
                        }
                    }
                });
            }

        });
    };

    // This binds Google Drive Chooser app initialization on click of its button
    this._bindGoogleDriveChooser = function (currentWidget, body) {
        body.on('click', 'span.gdrive-button', function () {
            var picker = new google.picker.PickerBuilder().
                addView(google.picker.ViewId.DOCS).
                setCallback(function (data) {
                    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                        var doc = data[google.picker.Response.DOCUMENTS][0];
                        // Prepare data for template
                        currentWidget._url = doc.url;
                        currentWidget._host = 'drive.google.com';
                        currentWidget._fileName = doc.name;
                        currentWidget._contentType = 'gdrive';
                        currentWidget._contentSize =  'N/A';

                        var content = currentWidget.generateFileInfo();
                        body.html(content);
                    }
                }
            ).build();
            picker.setVisible(true);
            $('.picker.modal-dialog-bg').css('z-index', 1000001);
            $('.picker.modal-dialog.picker-dialog').css('z-index', 1000001);
        });
    };

    // This binds dropBox Chooser app initialization on click of its button
    this._bindDropBoxChooser = function (currentWidget, body) {
        body.on('click', 'span.dropbox-button', function () {
            Dropbox.choose({
                success: function (files) {
                    // Prepare data for template
                    currentWidget._url = files[0].link;
                    currentWidget._host = 'dropbox.com';
                    currentWidget._fileName = files[0].name;
                    currentWidget._contentType = 'dropbox';
                    currentWidget._contentSize =  currentWidget.bytesToSize(files[0].bytes, 2);

                    var content = currentWidget.generateFileInfo();
                    body.html(content);
                },
                // Gives us direct links to uploaded files
                linkType: "direct"
            });
        });

    };

    // Generates basic input field for links which users will paste
    this.generateInputField = function (value) {
        var tpl = $('script#file-widget-field-tpl').html();
        tpl = tpl.replace('{id}', this._id);
        tpl = tpl.replace('{value}', value);
        return tpl;
    };

    // Methods for generating content for various link types (eg. jpg, gif, ppt, xls ...)
    // For every filetype, you can specify it's template (in FileTool.ALLOWED_TYPES object)

    // Renders standard file information box
    this.generateFileInfo = function () {
        var tpl = $('script#file-widget-file-tpl').html();
        tpl = tpl.replace('{url}', this._url);
        tpl = tpl.replace('{extension}', FileTool.ALLOWED_TYPES[this._contentType]['extension']);
        tpl = tpl.replace('{baseName}', this._fileName);
        tpl = tpl.replace('{type}', FileTool.ALLOWED_TYPES[this._contentType]['fileType']);
        tpl = tpl.replace('{size}', this.bytesToSize(this._contentSize, 2));
        tpl = tpl.replace('{host}', this._host);
        return tpl;
    };

    // This will render web link template
    this.generateLinkEmbed = function () {
        var tpl = $('script#file-widget-file-tpl').html();
        return tpl;
    };

    // Renders image
    this.generateImage = function () {
        var tpl = $('script#file-widget-image-tpl').html();
        return tpl.replace('{url}', this._url);
    };

    // Renders error info
    this.generateErrorInfo = function (msg) {
        var tpl = $('script#file-widget-error-tpl').html();
        return tpl.replace('{message}', msg);
    };

    // Transforms given bytes into a more readable format (KB, MB, GB...)
    this.bytesToSize = function (bytes, precision) {
        console.log(bytes)
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        var posttxt = 0;
        if (bytes == 0) return 'n/a';
        while (bytes >= 1024) {
            posttxt++;
            bytes = bytes / 1024;
        }
        
        return parseInt(bytes).toFixed(precision) + " " + sizes[posttxt];
    }


    BaseWidget.prototype.init.call(this);
}

FileWidget.prototype = new BaseWidget();
FileWidget.prototype.constructor = FileWidget;