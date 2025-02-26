{extends file="layouts/embed.tpl"}

{block name="title"}{$weby.title}{/block}
{block name="head"}
    <meta name="description" content="{$weby.description|default:'Created with Weby.io'}"/>
    <meta property="og:site_name" content="Weby.io"/>
    <meta property="og:title" content="{$weby.title}"/>
    <meta property="og:url" content="{$weby.publicUrl}"/>
    <meta property="og:image" content="{$weby->getImage('open-graph')}"/>
    <meta property="og:description" content="{$weby.description|default:'Created with Weby.io'}"/>
    {if !$weby.metaFollow}
        <meta name="robots" content="noindex, nofollow">
    {/if}
    {if $weby.user.serviceName == 'google'}
        <link rel="author" href="https://plus.google.com/{$weby.user.serviceUserId}">
    {else}
    {*<link href="https://plus.google.com/TREBA-NAM-GPLUS" rel="publisher"/>*}
    {/if}
    <link data-page-subject="true" href="{$weby->getImage('original-screenshot')}" rel="image_src"/>
    {include file="templates/common/linkWidgetTemplates.tpl"}
    <script type="text/javascript" id="initScript">
        var weby = {$weby->toJson()};
    </script>
{/block}
{block name="content"}
    {include file="templates/pages/includes/webyDetails.tpl"}
    {include file="templates/common/webyContent.tpl"}
    <div class="bootstrap" data-role="weby">{$weby->toJson()}</div>
    <div class="bootstrap" data-role="json-data">{$weby->getSummaryData()}</div>
    <div class="embed-background" style="background: url({$weby->getImage('original-screenshot')})"></div>
    <div class="loading-overlay">
        <div class="loading-title">
            <p>weby.io presents<span>{$weby.title|truncate:35:'...'}</span></p>
            <p class="click-to-see">
                <a id="playWeby" href="javascript:void(0)" class="progress-message">Click to see this Weby!</a>
                <span class="progressbar" style="width: 100%; display:none; margin-top: 6px;"><span class="percentage" style="width:0; background-color:#fff; height: 3px;"></span></span>
            </p>
        </div>
    </div>
    <div class="footer embed-footer">
        <a href="{$weby->getPublicUrl()}" target="_blank">{$weby->getPublicUrl()}</a>
    </div>
    <span id="lazyLoad" style="display:none">
        <!--
        {include file="templates/pages/includes/embedIncludes.tpl"}
        {include file="templates/pages/includes/embedRemoteIncludes.tpl"}
        -->
    </span>
{/block}
