<div class="dialog" id="my-webies-dialog">

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
            <a href="javascript:void(0)" data-role="btn-cancel"><span class="button">Cancel</span></a>
            <a href="javascript:void(0)" data-role="btn-delete"><span class="button">Yes, remove it!</span></a>
        </div>
    </div>
    <h1>My Webies</h1>
    <div class="empty-list" style="display:none; margin: 100px 0 0 50px;">
        <img src="{$viewObject.themeWebPath}images/empty.png"/>
    </div>
    <div class="webies-list"></div>
    <div class="webies-footer">
        <div class="webies-pager"></div>
        <a href="{$viewObject.webPath}editor/create/" style="float:right;"><span class="button">Create new Weby</span></a>
    </div>
</div>

{literal}
<script type="weby/tpl" id="webies-list-item-tpl">
    <ul class="webies-list">
        <li class="webies-list-item">
            <img class="weby-thumbnail" src="${thumbnail}"/>
            <ul class="weby-data left">
                <li>
                    <h2>Your Pagename</h2>
                </li>
                <li>
                    <h3>Tags</h3>
                            <span class="weby-tag">
                                pets
                            </span>
                            <span class="weby-tag">
                                orange
                            </span>
                            <span class="weby-tag">
                                cute
                            </span>
                </li>
            </ul>
            <ul class="weby-actions right">
                <li>
                    <p>
                        Edited: 29/May/2013
                    </p>
                </li>
                <li>
                    <a href="${public_url}"><span class="button view">Delete</span></a>
                    <a href="${editor_url}"><span class="button">Edit</span></a>
                    <a href="${public_url}"><span class="button main">View</span></a>
                </li>
            </ul>
        </li>
    </ul>

   <!-- <div class="webies-list-item" style="position: relative;" data-id="${id}">
        <img class="weby-thumbnail" src="${thumbnail}"/>
        <div class="weby-data left">
            <h2>${title}</h2>
            <p><h3>Tags</h3>
            <div class="weby-tags-list">

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
                <a href="javascript:void(0);"><span class="button">Delete</span></a>
                <a href="${editor_url}"><span class="button">Edit</span></a>
                <a href="${public_url}"><span class="button">View</span></a>
                </p>
            </div>
        </div> -->
</script>
{/literal}