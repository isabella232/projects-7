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
    <script type="text/javascript" id="initScript" >
        BaseWidget.CONTENT_VALIDATOR = '{$contentValidator}';
        var weby = {$weby->toJson()};
        $(function () {
            App = new AppClass();
            App.init();
            $('#initScript').remove();
        });
    </script>
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
        <a href="javascript:void(0)" class="disabled tool-icon bring-to-front">To Front</a>
        <a href="javascript:void(0)" class="disabled tool-icon bring-forward">Forward</a>
        <a href="javascript:void(0)" class="disabled tool-icon send-backward">Backward</a>
        <a href="javascript:void(0)" class="disabled tool-icon send-to-back">To Back</a>
        <a href="javascript:void(0)" class="disabled tool-icon widget">Widget</a>
        <a href="javascript:void(0)" class="tool-icon background">Canvas</a>
        <a href="javascript:void(0)" class="tool-icon document">Document</a>
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