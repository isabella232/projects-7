<script type="text/javascript">
    var THEME = '{$viewObject.themeWebPath}';
    var WEB = '{$viewObject.webPath}';
</script>

{minify type="css"}
    kendo.common.min.css,
    kendo.default.min.css,
    font-awesome.min.css,
    main.css,
    toolbar.css,
    widget.css,
    widgets/textWidget.css,
    widgets/mapWidget.css,
    widgets/twitterWidget.css,
    widgets/videoWidget.css,
    widgets/fileWidget.css
{/minify}

{minify type="js"}
    jquery-1.8.3.js,
    jquery-ui-1.9.2.custom.js,
    shortcut.js,
    mouseEvent.js,
    jQueryFix.js,
    sprintf.min.js,
    webyDrag.js,
    app.js,
    appToolbar.js,
    baseTool.js,
    baseWidget.js,
    baseIframeWidget.js,
    tools/textTool.js,
    tools/mapTool.js,
    tools/instagramTool.js,
    tools/videoTool.js,
    tools/preziTool.js,
    tools/slideShareTool.js,
    tools/googleDriveTool.js,
    tools/skyDriveTool.js,
    tools/soundCloudTool.js,
    tools/twitterTool.js,
    tools/linkedInTool.js,
    tools/fileTool.js,
    widgets/textWidget.js,
    widgets/mapWidget.js,
    widgets/instagramWidget.js,
    widgets/videoWidget.js,
    widgets/preziWidget.js,
    widgets/slideShareWidget.js,
    widgets/googleDriveWidget.js,
    widgets/skyDriveWidget.js,
    widgets/soundCloudWidget.js,
    widgets/twitterWidget.js,
    widgets/linkedInWidget.js,
    widgets/fileWidget.js,
    init.js
{/minify}

<!-- Outer JS -->
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script src="http://www.google.com/jsapi"></script>
<script type="text/javascript" src="https://www.dropbox.com/static/api/1/dropins.js" id="dropboxjs"
        data-app-key="685m5csc17munwq"></script>
<script src="{$viewObject.themeWebPath}js/kendo.web.min.js"></script>


<!-- The standard Google Loader script. -->
<script type="text/javascript">
    // TODO: move this to a more convenient place
    google.load('picker', '1');
</script>