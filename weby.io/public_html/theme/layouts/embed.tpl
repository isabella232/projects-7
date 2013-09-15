{* Description: Weby.io Master Layout

 Available blocks:
    - title
    - head
    - content
    - headerRightTools
*}
<!DOCTYPE html>
<html>
<head>
    <title>{block name="title"}{/block} | Weby.io</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="utf-8">

    {minify type="css"}
        embed.css,
        headerMiddle.css,
        weby.css
    {/minify}

    {minify type="js"}
        jquery-2.0.3.min.js,
        jquery-ui-1.9.2.webyio.js,
        jQueryFix.js,
        jquery.fancybox.pack.js
    {/minify}

    <script type="text/javascript">
        var THEME = '{$viewObject.themeWebPath}';
        var WEB = '{$viewObject.webPath}';
    </script>

    {block name="head"}{/block}

</head>
<body class="embed">
<div id="header">
    <div id="header-content">
        <div class="content-left">
            <h2>Weby.io<img src="{$viewObject.themeWebPath}images/webiny.png"/></h2>
        </div>
        <div class="content-right">
            {block name="headerRightTools"}{/block}
        </div>
    </div>
</div>
{block name="content"}{/block}
</body>
</html>