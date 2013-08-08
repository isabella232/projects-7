var FileTool = function (parent) {
    this._toolTag = 'file';
    this._mouseIcon = 'images/file.png';
    this._mouseText = 'Click to put file';
    this._tooltipText = 'File';
    this._parent = parent;

    this.contentClick = function (e) {
        BaseTool.prototype.contentClick.call(this, e);
        var widget = new FileWidget();
        this.insertWidgetAt(widget, e.offsetX, e.offsetY);
    }

    this.init = function () {
        BaseTool.prototype.init.call(this);
    }

}
// Define allowed file types that users can link
FileTool.ALLOWED_TYPES = {

    // Textual
    'text/css': {'extension': 'css', 'fileType': 'Cascading Style Sheet', 'tpl': 'FileInfo'},
    'text/plain': {'extension': 'txt', 'fileType': 'Text File', 'tpl': 'FileInfo'},
    'text/html': {'extension': 'html', 'fileType': 'HTML File', 'tpl': 'FileInfo'},

    // Documents
    'application/pdf': {'extension': 'pdf', 'fileType': 'Portable Document Format', 'tpl': 'FileInfo'},
    'application/rtf': {'extension': 'rtf', 'fileType': 'Rich Text File', 'tpl': 'FileInfo'},

    // Executable
    'application/octet-stream': {'extension': 'exe', 'fileType': 'Executable file', 'tpl': 'FileInfo'},

    // Archives
    'application/zip': {'extension': 'zip', 'fileType': 'ZIP Archive', 'tpl': 'FileInfo'},
    'application/x-rar': {'extension': 'rar', 'fileType': 'RAR Archive', 'tpl': 'FileInfo'},

    // Office
    'application/msword': {'extension': 'doc', 'fileType': 'Microsoft Word Document', 'tpl': 'FileInfo'},
    'application/vnd.ms-excel': {'extension': 'xls', 'fileType': 'Microsoft Excel Spreadsheet', 'tpl': 'FileInfo'},
    'application/vnd.ms-powerpoint': {'extension': 'ppt', 'fileType': 'Microsoft PowerPoint Presentation', 'tpl': 'FileInfo'},

    // Images
    'image/x-photoshop': {'extension': 'psd', 'fileType': 'Adobe Photoshop Document', 'tpl': 'FileInfo'},
    'image/gif': {'extension': 'gif', 'fileType': 'Graphic Interchange Format', 'tpl': 'Image'},
    'image/png': {'extension': 'png', 'fileType': 'Portable Network Graphics', 'tpl': 'Image'},
    'image/jpg': {'extension': 'jpg', 'fileType': 'Joint Photographic Experts Group', 'tpl': 'Image'},
    'image/jpeg': {'extension': 'jpg', 'fileType': 'Joint Photographic Experts Group', 'tpl': 'Image'},

    // Service based file-types
    'dropbox': {'extension': 'dbx', 'fileType': 'Dropbox File', 'tpl': 'FileInfo'},
    'gdrive': {'extension': 'gdrv', 'fileType': 'Google Drive File', 'tpl': 'FileInfo'}

    // Video

};

FileTool.prototype = new BaseTool();
FileTool.prototype.constructor = TextTool;