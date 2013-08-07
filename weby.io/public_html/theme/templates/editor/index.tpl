{extends file="layouts/master.tpl"}
{block name="content"}
    <div id="toolbar-wrapper"></div>
    <div id="content"></div>
    <div class="clearfix"></div>

    <script type="text/javascript">
        $(function () {
            App = new AppClass();
            App.init();
        });
    </script>
{/block}