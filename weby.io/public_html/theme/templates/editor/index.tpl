{extends file="layouts/master.tpl"}

{block name="title"}Weby editor{/block}
{block name="head"}

    {include file="templates/editor/includes/editorIncludes.tpl"}

    <!-- Outer JS -->
    <script src="http://www.youtube.com/iframe_api"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script src="http://www.google.com/jsapi"></script>
    <script type="text/javascript" src="https://www.dropbox.com/static/api/1/dropins.js" id="dropboxjs"
            data-app-key="685m5csc17munwq"></script>
    <script src="{$viewObject.themeWebPath}js/kendo.web.min.js" charset="utf-8"></script>
    <!-- The standard Google Loader script. -->
    <script type="text/javascript">
        // TODO: move this to a more convenient place
        google.load('picker', '1');
    </script>
    <script type="text/javascript" id="initScript">
        var showDashboard = {if isset($showDashboard)}true{else}false{/if};
        {if isset($contentValidator)}
            BaseWidget.CONTENT_VALIDATOR = '{$contentValidator}';
        {/if}
        {if $weby}
            var weby = {$weby->toJson()};
        {/if}
        $(function () {
            App = new AppClass();
            App.init();
            $('#initScript').remove();
        });
    </script>
{/block}
{block name="content"}
    <div id="toolbar-wrapper">
        <a class="collapse" href="javascript:void(0);">Click to collapse</a>
    </div>
    <div id="weby-toolbar-wrapper">
        <a href="javascript:void(0)" class="disabled tool-icon bring-to-front">To Front</a>
        <a href="javascript:void(0)" class="disabled tool-icon bring-forward">Forward</a>
        <a href="javascript:void(0)" class="disabled tool-icon send-backward">Backward</a>
        <a href="javascript:void(0)" class="disabled tool-icon send-to-back">To Back</a>
        <a href="javascript:void(0)" class="disabled tool-icon widget">Widget</a>
        <a href="javascript:void(0)" class="tool-icon background">Background</a>
    </div>
    <div id="content-background">
        <div id="player"></div>
    </div>
    <div id="content"></div>
    <div class="clearfix"></div>
    {include file="templates/editor/includes/templates.tpl"}
{/block}

{block name="headerRightTools"}
    {if $viewObject.user}
        {if $weby}
            {include file="templates/editor/includes/webyTitle.tpl"}
        {/if}
        <div style="float:right">
            <a id="my-webies" href="javascript:void(0)" style="float: left; margin: 3px 50px 0 0;" class="button">My
                Webies</a>
            {include file="templates/common/socialShare.tpl"}
            {include file="templates/common/userOptions.tpl"}
        </div>
    {/if}
{/block}