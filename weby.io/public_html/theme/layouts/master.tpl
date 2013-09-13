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
        main.css,
        headerMiddle.css,
        weby.css,
        dialog/dialog.css,
        dialog/myWebies.css,
        dialog/myFavorites.css
    {/minify}

    {minify type="js"}
        jquery-2.0.3.min.js,
        jquery-ui-1.9.2.webyio.js,
        jQueryFix.js,
        jquery.fancybox.pack.js,
        time.js,
        timeTransform.js
    {/minify}

    <script type="text/javascript">
        var THEME = '{$viewObject.themeWebPath}';
        var WEB = '{$viewObject.webPath}';
    </script>
    {block name="head"}{/block}

</head>
<body class="{block name="body-class"}{/block}">
<div id="fb-root"></div>
<div id="sharePost"></div>

<div class="header">
    <div data-role="weby-save" class="saving">
        <p>Saving...</p>
    </div>
    <div class="logo">
        <a href="/"><img src="{$viewObject.themeWebPath}images/weby-logo.png"></a>
        <time class="passed" datetime="2008-07-17T09:24:17Z">July 17, 2008</time>

    </div>
    {block name="headerMiddle"}{/block}
    <div class="header-right">
        <ul>
            {block name="headerRightTools"}{/block}
        </ul>
    </div>
</div>
{block name="content"}{/block}
<div class="footer" >
    <ul>
        <li>
            <a href="">Help</a>
        </li>
        <li>
            <a href="">About</a>
        </li>
        <li>
            <a href="">Terms of Service</a>
        </li>
        <li>
            <a href="">Keyboard Shortcuts</a>
        </li>
    </ul>
            <span>
                <a href=""></a>
            </span>
</div>
</body>
</html>