{extends file="layouts/master.tpl"}

{block name="title"}Weby editor{/block}
{block name="head"}
    <script type="text/javascript">
        $(function () {
            App = new AppClass();
            App.init();
        });
    </script>
{/block}
{block name="content"}
    <div id="toolbar-wrapper"></div>
    <div id="content"></div>
    <div class="clearfix"></div>
    {include file="templates/editor/includes/templates.tpl"}
{/block}