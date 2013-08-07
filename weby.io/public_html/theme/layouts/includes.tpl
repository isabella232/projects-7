{*

Tu treba napraviti onaj plugin za minify

{minify type="css"}
    kendo.common.min.css,
    kendo.common.min.css,
{/minify}

{minify type="js"}
    jquery.js,
    tools/textTool.js,
    widgets/textWidget.js
{/minify}

Path pisem od css root foldera ili od js root foldera, pa ti interno dodavaj root path.
*}

<script type="text/javascript">
    var THEME = '{$viewObject->themeWebPath}';
    var WEB = '{$viewObject->webPath}';
</script>

<!-- Main CSS -->
<link href="{$viewObject->themeWebPath}css/kendo.common.min.css" rel="stylesheet">
<link href="{$viewObject->themeWebPath}css/kendo.default.min.css" rel="stylesheet">
<link href="{$viewObject->themeWebPath}css/font-awesome.min.css" rel="stylesheet">
<link href="{$viewObject->themeWebPath}css/main.css" rel="stylesheet">
<link href="{$viewObject->themeWebPath}css/toolbar.css" rel="stylesheet">
<link href="{$viewObject->themeWebPath}css/widget.css" rel="stylesheet">
<!-- Widgets CSS -->
<link href="{$viewObject->themeWebPath}css/widgets/textWidget.css" rel="stylesheet">
<link href="{$viewObject->themeWebPath}css/widgets/mapWidget.css" rel="stylesheet">
<link href="{$viewObject->themeWebPath}css/widgets/twitterWidget.css" rel="stylesheet">
<link href="{$viewObject->themeWebPath}css/widgets/fileWidget.css" rel="stylesheet">
<!-- Libs JS -->
<script src="{$viewObject->themeWebPath}js/jquery-1.8.3.js"></script>
<script src="{$viewObject->themeWebPath}js/jquery-ui-1.9.2.custom.js"></script>
<script src="{$viewObject->themeWebPath}js/jquery.transit.min.js"></script>
<script src="{$viewObject->themeWebPath}js/drag-on.js"></script>
<script src="{$viewObject->themeWebPath}js/smokeEffect.js"></script>
<script src="{$viewObject->themeWebPath}js/kendo.web.min.js"></script>
<script src="{$viewObject->themeWebPath}js/shortcut.js"></script>
<script src="{$viewObject->themeWebPath}js/mouseEvent.js"></script>
<script src="{$viewObject->themeWebPath}js/jQueryFix.js"></script>
<!-- App JS -->
<script src="{$viewObject->themeWebPath}js/app.js"></script>
<script src="{$viewObject->themeWebPath}js/appToolbar.js"></script>
<script src="{$viewObject->themeWebPath}js/baseTool.js"></script>
<script src="{$viewObject->themeWebPath}js/baseWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/baseIframeWidget.js"></script>
<!-- Tools JS -->
<script src="{$viewObject->themeWebPath}js/tools/textTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/mapTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/videoTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/preziTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/slideShareTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/googleDriveTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/skyDriveTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/soundCloudTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/twitterTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/linkedInTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/fileTool.js"></script>
<script src="{$viewObject->themeWebPath}js/tools/fileDragListener.js"></script>
<!-- Widgets JS -->
<script src="{$viewObject->themeWebPath}js/widgets/textWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/mapWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/videoWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/preziWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/slideShareWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/googleDriveWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/skyDriveWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/soundCloudWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/twitterWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/linkedInWidget.js"></script>
<script src="{$viewObject->themeWebPath}js/widgets/fileWidget.js"></script>
<!-- Other JS -->
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script src="{$viewObject->themeWebPath}js/init.js"></script>