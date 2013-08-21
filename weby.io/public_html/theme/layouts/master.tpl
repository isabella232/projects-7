{* Description: Weby.io Master Layout

 Available blocks:
    - title
    - head
    - content
*}
<!DOCTYPE html>
<html>
<head>
    <title>{block name="title"}{/block} | Weby.io</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="utf-8">
    <meta property="og:title" content="TEST TITLE"/>
    <meta property="og:image" content="http://weby.com/theme/images/webiny.png"/>
    <meta property="og:description" content="SHARE WITH WEBY"/>
    {minify type="css"}
        main.css,
        user.css
    {/minify}

    {minify type="js"}
        jquery-1.8.3.js,
        jquery-ui-1.9.2.custom.js
    {/minify}

    <script type="text/javascript">
        var THEME = '{$viewObject.themeWebPath}';
        var WEB = '{$viewObject.webPath}';
    </script>

    {block name="head"}{/block}

</head>
<body>
<div id="header">
    <div id="header-content">
        <div class="content-left">
            <h2>Weby.io<img src="{$viewObject.themeWebPath}images/webiny.png"/></h2>
            <h4 style="width: 500px">Create and share your content instantly</h4>
        </div>
        <div class="content-right">
            {block name="headerRightTools"}{/block}
        </div>
    </div>
</div>
{block name="content"}{/block}
</body>
</html>