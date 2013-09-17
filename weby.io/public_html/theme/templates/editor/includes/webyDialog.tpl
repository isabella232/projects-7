<div class="dialog" id="weby-dialog" style="display:none;">
    <a href="" class="close-dialog"></a>

    <h1>My Weby</h1>
    <fieldset>
        <input type="text" id="weby-title-field" placeholder="Weby title" value="{$weby.title}">
        <span id="weby-tags-wrapper">
            <span class="weby-tags">
                {foreach from=$weby.tags item=tag}
                    <span data-tag="{$tag.tag}" data-id="{$tag.id}" class="weby-tag">{$tag.tag}
                        <span class="remove-tag"></span>
                    </span>
                {/foreach}
            </span>
            <div id="weby-tag-input" class="tags-editable" contenteditable="true"></div>
            <div id="weby-tags-dropdown"><ul id="tags-list"></ul></div>
        </span>
        <textarea class="description" id="weby-description-field" placeholder="Enter short description">{$weby.description}</textarea>

        <p class="buttons">
            <span class="button" data-role="weby-dialog-close">Cancel</span>
            <span class="button main" data-role="weby-dialog-save">Save Changes</span>
        </p>
    </fieldset>
</div>