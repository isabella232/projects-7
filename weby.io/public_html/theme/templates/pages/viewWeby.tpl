{extends file="layouts/master.tpl"}

{block name="title"}{$weby.title}{/block}
{block name="head"}
{/block}
{block name="content"}
    <div style="margin: 150px; text-align: center">
   - ovdje ce se pokazivati webiji <b>:))</b> -
    </div>
{/block}
{block name="headerRightTools"}
    {include file="templates/pages/includes/socialShare.tpl"}
    {if $viewObject.user}
        {include file="templates/pages/includes/userOptions.tpl"}
    {/if}
{/block}