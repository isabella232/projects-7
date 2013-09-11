{*{if (!isset($editor) || !$editor) && $weby.user.id != $viewObject.user.id}
            <a href="javascript: void(0);" id="add-to-favs">
                <span class="share-icon social-favorites{if $weby->isInFavorites()}-added{/if}"></span></a>
        {/if}*}
<!-- SHARING ICONS -->
{if $weby}
    <li id="social-sharing">
        <p>Share</p>
        <ul>
            <li class="facebook" data-role="facebook-share">
                <a href="javascript: void(0);"></a>
                <span class="social-counter">{$weby.shareCount.facebook}</span>
            </li>
            <li class="twitter" data-role="twitter-share">
                <a href="javascript: void(0);"></a>
                <span class="social-counter">{$weby.shareCount.twitter}</span>
            </li>
            <li class="gplus" data-role="gplus-share">
                <a href="javascript: void(0);"></a>
                <span class="social-counter">{$weby.shareCount.google}</span>
            </li>
        </ul>
    </li>
{/if}