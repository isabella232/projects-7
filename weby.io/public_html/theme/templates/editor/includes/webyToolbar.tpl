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
        <li class="dropdown">
            <a href="javascript:void(0)" class="tool-icon document">Document</a>
            <div id="document-settings-dropdown" class="menu">
                {include file="templates/editor/includes/documentSettings.tpl"}
            </div>
        </li>
    </ul>
</div>