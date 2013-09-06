var LinkTool = function (parent) {
    this._toolTag = 'link';
    this._mouseText = '{action} to insert a link';
    this._tooltipText = 'Link';
    this._parent = parent;
    this._widgetClass = 'LinkWidget';
    this._parserClass = 'LinkParser';

}
// Define allowed file types that users can link
LinkTool.ALLOWED_TYPES = {

    // Textual
    'text/css': {'extension': 'css', 'fileType': 'Cascading Style Sheet', 'tpl': 'FileInfo'},
    'text/plain': {'extension': 'txt', 'fileType': 'Text File', 'tpl': 'FileInfo'},
    'text/html': {'extension': 'html', 'fileType': 'HTML File', 'tpl': 'LinkEmbed'},

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
    'gdrive': {'extension': 'gdrv', 'fileType': 'Google Drive File', 'tpl': 'FileInfo'},

    // Video
    'video/quicktime': {'extension': 'mov', 'fileType': 'Apple QuickTime Movie', 'tpl': 'FileInfo'},
    'video/mpeg': {'extension': 'mpeg', 'fileType': 'MPEG Video File', 'tpl': 'FileInfo'},
    'video/x-flv': {'extension': 'flv', 'fileType': 'FLV Video File', 'tpl': 'FileInfo'},
    'video/x-msvideo': {'extension': 'avi', 'fileType': 'AVI Video File', 'tpl': 'FileInfo'},
    'video/mp4': {'extension': 'mp4', 'fileType': 'MP4 Video File', 'tpl': 'FileInfo'},

    // Audio
    'audio/mpeg': {'extension': 'mp3', 'fileType': 'MP3 Audio File', 'tpl': 'FileInfo'},
    'audio/x-wav': {'extension': 'wav', 'fileType': 'Waveform Audio File', 'tpl': 'FileInfo'}

};

LinkTool.prototype = new BaseTool();
LinkTool.prototype.constructor = LinkTool;