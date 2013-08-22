{extends file="layouts/master.tpl"}

{block name="title"}{$weby.title}{/block}
{block name="head"}
    <meta property="og:site_name" content="Weby.io"/>
    <meta property="og:title" content="{$weby.title}"/>
    <meta property="og:image" content="{$viewObject.themeWebPath}images/webiny.png"/>
    <meta property="og:description" content="Created with Weby.io"/>
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