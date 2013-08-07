{* Empty layout is used for rendering content which does not require the design of the main website (embed iframes) *}
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <script src="{$viewObject->themeWebPath}js/jquery-1.8.3.js"></script>
    <style type="text/css">
        body{
            margin:0;
            padding:0;
            overflow:hidden;
        }
    </style>
    {block name="head"}{/block}
</head>
<body>
{block name="content"}{/block}
</body>
</html>
