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
        weby.css,
        dialog/dialog.css,
        dialog/myWebies.css
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
<body class="{block name="body-class"}{/block}">
<div id="fb-root"></div>
<div id="sharePost"></div>

<div class="header">
    <div data-role="weby-save" class="saving">
        <p>Saving...</p>
    </div>
    <div class="logo">
        <a href="/"><img src="{$viewObject.themeWebPath}images/weby-logo.png"></a>
    </div>

    <div class="header-middle header-middle-wrap" data-role="weby-title">
        <div class="edit-title">
            <h2>Your page name goes tooooo long</h2>
            <a href="javascript:void(0)" data-role="edit-title">Edit title</a>
        </div>
        <p class="weby-url">www.youweby.com/and-this-link-is-longer-than-it-should-be/</p>
        <div class="share-drop">
            <span class="share-url"></span>
            <form>
                <fieldset>
                    <p>
                        <label>Url</label>
                        <input type="text" class="youweby-url" placeholder="http://www.youweby.com">
                    </p>
                    <p>
                        <label>Embed</label>
                        <input type="text" class="youweby-embed">
                    </p>
                    <a href="" class="close-form"></a>
                </fieldset>
            </form>

        </div>
    </div>

    <div class="header-right">
        <ul>
            {block name="headerRightTools"}{/block}
        </ul>
    </div>

</div>

{*<div id="header">
    <div id="header-content">
        <div class="content-left">
            <h2>Weby.io<img src="{$viewObject.themeWebPath}images/webiny.png"/></h2>
            <h4>Create and share your content instantly</h4>
        </div>
        <div class="content-right">
            {block name="headerRightTools"}{/block}
        </div>
    </div>
</div>*}
{block name="content"}{/block}
<div class="footer">
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
    <span><a href="http://www.webiny.com"></a></span>
</div>
</body>
</html>