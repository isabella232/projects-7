<div class="modal-dialog" id="my-webies-dialog" style="display:none; width: 100%; height:100%">
    <div class="dialog-loading">
        <div class="overlay"></div>
        <div class="text">
            Loading...
        </div>
    </div>
    <div class="delete-confirmation" style="display:none">
        <div class="overlay"></div>
        <div class="message">
            Nooo, you really want to remove your Weby?
        </div>
        <div class="actions">
            <a href="javascript:void(0)" data-role="btn-cancel"><span class="dialog-button edit">Cancel</span></a>
            <a href="javascript:void(0)" data-role="btn-delete"><span class="dialog-button view">Yes, remove it!</span></a>
        </div>
    </div>
    <h1>My Webies</h1>
    <div class="empty-list" style="display:none; margin: 100px 0 0 50px;">
        <img src="{$viewObject.themeWebPath}images/empty.png"/>
    </div>
    <div class="webies-list"></div>
    <div class="webies-footer">
        <div class="webies-pager"></div>
        <a href="{$viewObject.webPath}editor/create/" style="float:right;"><span
                    class="dialog-button create">Create new Weby</span></a>
    </div>
</div>

{literal}
<script type="weby/tpl" id="webies-list-item-tpl">
    <div class="webies-list-item" style="position: relative;" data-id="${id}">
        <img class="weby-thumbnail" src="${thumbnail}"/>
        <div class="weby-data left">
            <h2>${title}</h2>
            <p><h3>Tags</h3>
            <div class="weby-tags-list">
                <span class="weby-tag">Metal</span>
                <span class="weby-tag">Metal</span>
                <span class="weby-tag">Progressive</span>
                <span class="weby-tag">Math</span>
                <span class="weby-tag">Math</span>
                <span class="weby-tag">Math</span>
                <span class="weby-tag">Math</span>
                <span class="weby-tag">Math</span>
                <span class="weby-tag">Math</span>
                <span class="weby-tag">Math</span>
                <span class="weby-tag">Math</span>
                <span class="weby-tag">Math</span>

                <a href="javascript:void(0);">
                    </a>
                </div>
            </p>
            </div>
        <div class="weby-actions right">
            <p>${modified_on}</p>
            <p>
                <span class="weby-quick-data">${hits} hits</span>
                <span class="weby-quick-data">${favorites} favorites</span>
                </p>
            </div>
        <div class="weby-actions buttons right">
            <p style="">
                <a href="javascript:void(0);"><span class="dialog-button delete">Delete</span></a>
                <a href="${editor_url}"><span class="dialog-button edit">Edit</span></a>
                <a href="${public_url}"><span class="dialog-button view">View</span></a>
                </p>
            </div>
        </div>
</script>
{/literal}