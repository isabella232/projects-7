{extends file="layouts/empty.tpl"}
{block name="content"}
    {* For Pinterest - we must explicitly specify dimensions of the content *}
    <div style="{if $pinType == 'pin'}width:237px;height:313;{else}width:582px; height:261px{/if}">
    {if $pinType == 'pin'}
        <a data-pin-do="embedPin" href="{$pinUrl}"></a>
    {elseif $pinType == 'board'}
        <a data-pin-do="embedBoard" href="{$pinUrl}"></a>
    {else}
        <a data-pin-do="embedUser" href="{$pinUrl}"></a>
    {/if}
    <script type="text/javascript" src="http://assets.pinterest.com/js/pinit.js"></script>
    </div>
{/block} 