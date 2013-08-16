{extends file="layouts/master.tpl"}

{block name="title"}Weby editor{/block}
{block name="head"}
    <!-- Outer JS -->
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
    <script type="text/javascript" id="contentValidator">
        BaseWidget.CONTENT_VALIDATOR = '{$contentValidator}';
        $('#contentValidator').remove();
    </script>
    {if isset($widgets)}
        <script type="text/javascript" id="widgetsLoad">
            var webyWidgets = {$widgets};
            $('#widgetsLoad').remove();
        </script>
    {/if}
    <script type="text/javascript" charset="utf-8">
        $(function () {
            App = new AppClass();
            App.init();
        });
    </script>
{/block}
{block name="content"}
    <div id="toolbar-wrapper">
        <a class="collapse" href="javascript:void(0);">Click to collapse</a>
    </div>
    <div id="content"></div>
    <div class="clearfix"></div>
    {include file="templates/editor/includes/templates.tpl"}
{/block}