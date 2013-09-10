{extends file="layouts/master.tpl"}

{block name="title"}Weby editor{/block}
{block name="body-class"}editor{/block}
{block name="head"}
    {include file="templates/editor/includes/editorIncludes.tpl"}
    {include file="templates/editor/includes/editorRemoteIncludes.tpl"}
    <!-- The standard Google Loader script. -->
    <script type="text/javascript">
        google.load('picker', '1');
    </script>
    <script type="text/javascript" id="initScript">
        BaseWidget.CONTENT_VALIDATOR = '{$contentValidator}';
        var weby = {$weby->toJson()};
        $(function () {
            App = new AppClass();
            App.init();
            $('#initScript').remove();
        });
    </script>
{/block}

{block name="headerMiddle"}
    {include file="templates/editor/includes/title.tpl"}
{/block}

{block name="headerRightTools"}
    {assign var="editor" value="true"}
    {if $viewObject.user}
        <li class="my-webies">
            <a href="javascript:void(0)" data-role="my-webies"></a>
        </li>
        {include file="templates/common/socialShare.tpl"}
        {include file="templates/common/userOptions.tpl"}
        </div>
    {/if}
{/block}

{block name="content"}
    <div id="toolbar-wrapper"></div>
    <div id="weby-toolbar-wrapper">
        <ul>
            <li>
                <a href="javascript:void(0);" class="disabled tool-icon bring-to-front">To Front</a>
            </li>
            <li>
                <a href="javascript:void(0);" class="disabled tool-icon bring-forward">Forward</a>
            </li>
            <li>
                <a href="javascript:void(0);" class="disabled tool-icon send-backward">Backward</a>
            </li>
            <li>
                <a href="javascript:void(0);" class="disabled tool-icon send-to-back">To Back</a>
            </li>
            <li class="dropdown frame">
                <a href="javascript:void(0);" class="disabled tool-icon frame">Frame</a>
                <ul id="widget-settings-dropdown">
                    <li>
                        {include file="templates/editor/includes/widgetSettings.tpl"}
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="javascript:void(0)" class="tool-icon background">Canvas</a>
                <ul id="canvas-settings-dropdown">
                    <li>
                        {include file="templates/editor/includes/backgroundSettings.tpl"}
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="javascript:void(0)" class="tool-icon document">Document</a>
                <ul>
                    <li class="selected-tab">
                        <a href="">Color</a>
                    </li>
                    <li>
                        <a href="">Pattern</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div id="workspace">
        <div id="content-background">
            <div id="player"></div>
        </div>
        <div id="wrapper">
            <div id="content"></div>
            <div class="clearfix"></div>
        </div>
    </div>
    {include file="templates/editor/includes/templates.tpl"}
    {include file="templates/common/dashboard.tpl"}
{/block}