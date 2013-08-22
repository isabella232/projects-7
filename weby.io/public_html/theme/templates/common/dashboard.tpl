<ul style="padding:0; margin:0">
{foreach from=$webies item=weby}
    <li>
        <h3 style="margin: 2px;"><a href="{$weby->getEditorUrl()}">{$weby->getTitle()}</a></h3>
        <span>Last modified: {$weby->getModifiedOn()|date_format:"d.m.Y H:i:s"}</span>
    </li>
{/foreach}
</ul>
<a href="/editor/create/" class="button" style="margin-top:20px">Create new Weby</a>