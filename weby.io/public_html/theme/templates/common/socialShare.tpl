{if (!isset($editor) || !$editor) && $weby.user.id != $viewObject.user.id}
    <span data-role="add-to-favorite"
          class="share-icon social-favorites {if $weby->inUsersFavorites()}in-favorites{/if}">Fav</span>
{/if}
<!-- SHARING ICONS -->
{if $weby}
    <li id="social-sharing">
        <p>Share</p>
        <ul>
            <li class="facebook" data-role="facebook-share">
                <a href="javascript: void(0);"></a>
                <span class="social-counter">{$weby.shareCount.facebook|formattedNumber}</span>
            </li>
            <li class="twitter" data-role="twitter-share">
                <a href="javascript: void(0);"></a>
                <span class="social-counter">{$weby.shareCount.twitter|formattedNumber}</span>
            </li>
            <li class="gplus" data-role="gplus-share">
                <a href="javascript: void(0);"></a>
                <span class="social-counter">{$weby.shareCount.google|formattedNumber}</span>
            </li>
        </ul>
    </li>
{/if}