<!DOCTYPE html>
<html>
<head>
    <title>Weby.io</title>
    <meta charset='utf-8'>
    <link href="{$viewObject->webPath}theme/css/kendo.common.min.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/kendo.default.min.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/font-awesome.min.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/main.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/textWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/mapWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/videoWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/preziWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/slideShareWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/googleDriveWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/skyDriveWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/soundCloudWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/linkedInWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/twitterWidget.css" rel="stylesheet">
    <link href="{$viewObject->webPath}theme/css/fileWidget.css" rel="stylesheet">

    <script src="{$viewObject->webPath}theme/js/jquery-1.8.3.js"></script>
    <script src="{$viewObject->webPath}theme/js/jquery-ui-1.9.2.custom.js"></script>
    <script src="{$viewObject->webPath}theme/js/kendo.web.min.js"></script>
    <script src="{$viewObject->webPath}theme/js/shortcut.js"></script>
    <script src="{$viewObject->webPath}theme/js/mouseEvent.js"></script>
    <script src="{$viewObject->webPath}theme/js/jQueryFix.js"></script>
    <script src="{$viewObject->webPath}theme/js/app.js"></script>
    <script src="{$viewObject->webPath}theme/js/appToolbar.js"></script>
    <script src="{$viewObject->webPath}theme/js/baseTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/baseWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/baseIframeWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/textTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/eraserTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/mapTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/videoTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/preziTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/slideShareTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/googleDriveTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/skyDriveTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/soundCloudTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/twitterTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/linkedInTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/fileTool.js"></script>
    <script src="{$viewObject->webPath}theme/js/tools/fileDragListener.js"></script>

    <script src="{$viewObject->webPath}theme/js/widgets/textWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/mapWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/videoWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/preziWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/slideShareWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/googleDriveWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/skyDriveWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/soundCloudWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/twitterWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/linkedinWidget.js"></script>
    <script src="{$viewObject->webPath}theme/js/widgets/fileWidget.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script type="text/javascript">
        $(function () {
            App = new AppClass();
            App.init();
        });
    </script>
</head>
<body>
<div id="header">
    <div id="header-content">
        <h2>Weby.io</h2>
        <img src="{$viewObject->webPath}theme/images/webiny.png" style="height: 10px; float: left; margin: 8px 0 0 3px;"/>
        <h4>Create and share your content instantly</h4>
        <div id="toolbar-wrapper"></div>
    </div>
</div>