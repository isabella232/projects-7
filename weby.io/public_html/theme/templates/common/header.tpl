<div class="header">
    {if isset($editor) && $editor}
        <div data-role="weby-save" class="saving">
            <p>Saving...</p>
        </div>
    {/if}
    <div class="logo">
        <a href="/"><img src="{$viewObject.themeWebPath}images/weby-logo.png"></a>
    </div>
    {block name="headerMiddle"}{/block}
    <div class="header-right">
        <ul>
            {block name="headerRightTools"}{/block}
        </ul>
    </div>
</div>