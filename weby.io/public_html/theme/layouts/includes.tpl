<script type="text/javascript">
    var THEME = '{$viewObject.themeWebPath}';
    var WEB = '{$viewObject.webPath}';
</script>

{minify params="type=css&files=
                kendo.common.min.css,
                kendo.default.min.css,
                font-awesome.min.css,
                main.css,
                toolbar.css,
                widget.css,
                widgets/textWidget.css,
                widgets/fileWidget.css"}

<!-- Outer JS -->
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script src="http://www.google.com/jsapi"></script>
<script type="text/javascript" src="https://www.dropbox.com/static/api/1/dropins.js" id="dropboxjs"
        data-app-key="685m5csc17munwq"></script>


<!-- for now, Kendo manually included -->
<script src="{$viewObject.themeWebPath}js/kendo.web.min.js"></script>

{minify params="type=js&files=
                jquery-1.8.3.js,
                jquery-ui-1.9.2.custom.js,
                jquery.transit.min.js,
                drag-on.js,
                shortcut.js,
                mouseEvent.js,
                jQueryFix.js,
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
                widgets/fileWidget.js,
                init.js"}
{* also include >>>>>>> smokeEffect.js, widgets/linkedInWidget.js*}


<!-- The standard Google Loader script. -->
    <script type="text/javascript">
        // TODO: move this to a more convinient place
        google.load('picker', '1');
    </script>

<!-- also refactor !? -->
{include file="../templates/fileWidgetTemplates.tpl"}