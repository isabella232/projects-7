{extends file="layouts/master.tpl"}

{block name="title"}Weby editor{/block}
{block name="head"}
    {minify type="css"}
        list.css
    {/minify}

    {minify type="js"}
        frontend/listing.js
    {/minify}

{/block}
{block name="headerMiddle"}
    <div class="header-middle webies-list header-middle-wrap">
        <h2>{$tag}</h2>
    </div>
{/block}


{block name="headerRightTools"}
    {if $viewObject.user}
        <li class="my-webies">
            <a href="javascript:void(0)" data-role="dashboard-dialog-open"></a>
        </li>
    {/if}

    {if $viewObject.user}
        {include file="templates/common/userOptions.tpl"}
    {else}
        {include file="templates/pages/includes/authorization.tpl"}
    {/if}
{/block}

{block name="content"}
    <div style="overflow: scroll">
    <ul>
        Count: {$webiesCount}
        {if $webies}
            {foreach from=$webies item=w}
                <li class="weby-list-item">
                    {$w.title}
                </li>
            {/foreach}
        {/if}
    </ul>
    </div>
{/block}