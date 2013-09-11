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
            {if !$viewObject.user->completedOnboarding()}
            App.addEventListener(new Intro());
            {/if}
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
    <div id="toolbar"><ul></ul></div>
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

                <div id="widget-settings-dropdown" class="menu">
                    {include file="templates/editor/includes/widgetSettings.tpl"}
                </div>
            </li>
            <li class="dropdown">
                <a href="javascript:void(0)" class="tool-icon background">Canvas</a>
                <div id="canvas-settings-dropdown" class="menu">
                    {include file="templates/editor/includes/canvasSettings.tpl"}
                </div>
            </li>
            {*<li class="dropdown">
                <a href="javascript:void(0)" class="tool-icon document">Document</a>
                <ul>
                    <li class="selected-tab">
                        <a href="">Color</a>
                    </li>
                    <li>
                        <a href="">Pattern</a>
                    </li>
                </ul>
            </li>*}
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
    <div id="outer-widgets" style="display:none">
        <p>There are some widgets located outside of your new canvas.<br/> Would you like to move them inside your new
            canvas?</p>
        <button id="button-move-widgets">Yes, sure!</button>
        <button id="button-dont-move-widgets">No, leave them.</button>
    </div>
    {include file="templates/common/favorites.tpl"}
{/block}