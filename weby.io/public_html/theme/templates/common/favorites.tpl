<div class="modal-dialog" id="my-favorites-dialog" style="display:none; width: 100%; height:100%">
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
            <a href="javascript:void(0)" data-role="fav-btn-cancel"><span class="dialog-button edit">Cancel</span></a>
            <a href="javascript:void(0)" data-role="fav-btn-delete"><span class="dialog-button view">Yes, remove it!</span></a>
        </div>
    </div>
    <h1>My Favorites</h1>

    <div class="empty-list" style="display:none; margin: 100px 0 0 50px;">
        <img src="{$viewObject.themeWebPath}images/empty.png"/>
    </div>
    <div class="favorites-list"></div>
    <div class="favorites-footer">
        <div class="favorites-pager"></div>
    </div>
</div>

{literal}
    <script type="weby/tpl" id="favorites-list-item-tpl">
        <div class="favorites-list-item" style="position: relative;" data-id="${id}">
            <img class="weby-thumbnail" src="${thumbnail}"/>

            <div class="weby-data left">
                <h2>${title}</h2>
                <p>
                    <h3>Tags</h3>
                    <div class="weby-tags-list">
                        <span class="weby-tag">Tag</span>
                        <a href="javascript:void(0);"></a>
                    </div>
                </p>
            </div>
            <div class="weby-actions right">
                <p>${addedToFavoritesTime}</p>
                <p>
                    <span class="weby-quick-data">${hits} hits</span>
                    <span class="weby-quick-data">${favorites} favorites</span>
                </p>
            </div>
            <div class="weby-actions buttons right">
                <p style="">
                    <a href="${public_url}"><span class="dialog-button view">View</span></a>
                    <a href="javascript:void(0);"><span class="dialog-button delete">Delete</span></a>

                </p>
            </div>
        </div>
    </script>
{/literal}