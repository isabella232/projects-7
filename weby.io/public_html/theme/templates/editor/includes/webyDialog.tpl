<div class="dialog" id="weby-dialog" style="display:none;">
    <a href="" class="close-dialog"></a>

    <h1>Dialog title</h1>
    <fieldset>
        <input type="text" id="weby-title-field" placeholder="Your page name" value="{$weby.title}">
        <span id="weby-tags-wrapper">
            <span class="weby-tags"></span>
            <input type="text" >
            <div id="weby-tags-dropdown">
                <ul id="tags-list">
                </ul>
            </div>
        </span>
        <textarea class="description" id="weby-description-field" placeholder="Enter short description (160 chars notice dodat)">{$weby.description}</textarea>

        <p class="buttons">
            <span class="button" data-role="weby-dialog-close">Cancel</span>
            <span class="button main" data-role="weby-dialog-save">Save Changes</span>
        </p>
    </fieldset>
</div>