{extends file="layouts/master.tpl"}

{block name="title"}Weby editor{/block}
{block name="head"}
    <!-- Outer JS -->
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script src="http://www.google.com/jsapi"></script>
    <script type="text/javascript" src="https://www.dropbox.com/static/api/1/dropins.js" id="dropboxjs"
            data-app-key="685m5csc17munwq"></script>
    <script src="{$viewObject.themeWebPath}js/kendo.web.min.js"></script>

    <!-- The standard Google Loader script. -->
    <script type="text/javascript">
        // TODO: move this to a more convenient place
        google.load('picker', '1');
    </script>

    <script type="text/javascript">
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