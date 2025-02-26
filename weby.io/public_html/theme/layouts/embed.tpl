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
        font.css,
        embed.css,
        socialShare.css,
        weby.css,
        loading.css
    {/minify}

    {minify type="js"}
        third_party/jquery-2.0.3.min.js,
        third_party/jquery-ui-1.9.2.webyio.js,
        jQueryFix.js,
        third_party/jquery.fancybox.pack.js,
        embed/webySocialShare.js,
        embed/init.js
    {/minify}

    <script type="text/javascript">
        var THEME = '{$viewObject.themeWebPath}';
        var WEB = '{$viewObject.webPath}';
    </script>

    {block name="head"}{/block}

</head>
<body class="embed">
<div class="header embed-header">
    <span class="user-photo"><a href="{$viewObject.webPath}user/{$weby->getUser()->getUsername()}/"><img width="34" height="34" src="{$weby->getUser()->getAvatarUrl()}" title="{$weby->getUser()->getUsername()}" /></a></span>

    <p class="user-name">{$weby->getUser()->getUsername()}</p>

    <div class="embed-header-right">
                <span class="counter">
                    {$weby->getFavoriteCount()}
                </span>

        <div class="social-menu">
            <ul>
                <li class="facebook" data-role="facebook-share">
                    <a href="javascript: void(0);"></a>
                    <span class="social-counter">{$shareCount.facebook}</span>
                </li>
                <li class="twitter" data-role="twitter-share">
                    <a href="javascript: void(0);"></a>
                    <span class="social-counter">{$shareCount.twitter}</span>
                </li>
                <li class="gplus" data-role="gplus-share">
                    <a href="javascript: void(0);"></a>
                    <span class="social-counter">{$shareCount.google}</span>
                </li>
            </ul>
        </div>
    </div>
</div>
{block name="content"}{/block}
{include file="templates/common/ga.tpl"}
</body>
</html>