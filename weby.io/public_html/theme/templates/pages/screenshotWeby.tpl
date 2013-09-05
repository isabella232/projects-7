{extends file="layouts/screenshot.tpl"}

{block name="title"}{$weby.title}{/block}
{block name="head"}
    {include file="templates/pages/includes/appIncludes.tpl"}
    {include file="templates/pages/includes/appRemoteIncludes.tpl"}
    {include file="templates/common/linkWidgetTemplates.tpl"}
    <script type="text/javascript" id="initScript">
        var weby = {$weby->toJson()};
        $(function(){
            App = new AppClass(60);
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
