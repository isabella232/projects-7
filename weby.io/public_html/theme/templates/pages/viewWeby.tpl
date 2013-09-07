{extends file="layouts/master.tpl"}

{block name="title"}{$weby.title}{/block}
{block name="head"}
    <meta property="og:site_name" content="Weby.io"/>
    <meta property="og:title" content="{$weby.title}"/>
    <meta property="og:image" content="{$viewObject.themeWebPath}images/webiny.png"/>
    <meta property="og:description" content="Created with Weby.io"/>
    {include file="templates/pages/includes/appIncludes.tpl"}
    {include file="templates/pages/includes/appRemoteIncludes.tpl"}
    {include file="templates/common/linkWidgetTemplates.tpl"}
    {include file="templates/common/favorites.tpl"}
    <script type="text/javascript" id="initScript">
        var weby = {$weby->toJson()};
        $(function () {
            App = new AppClass();
            App.init();
            $('#initScript').remove();
        });
    </script>
{/block}
{block name="content"}
    <div id="workspace">
        <div id="content-background">
            <div id="player"></div>
        </div>
        <div id="wrapper">
            <div id="content"></div>
            <div class="clearfix"></div>
        </div>
    </div>
    {include file="templates/common/dashboard.tpl"}
{/block}
{block name="headerRightTools"}
    {include file="templates/common/socialShare.tpl"}
    {if $viewObject.user}
        {include file="templates/common/userOptions.tpl"}
    {/if}
{/block}