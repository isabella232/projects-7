<!-- SHARING ICONS -->
<div class="social-icons-wrapper">

    <!-- FACEBOOK SHARING -->
    <a href="#" onclick="
                        window.open(
                          'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent('{$viewObject.webPath}{$weby.slug}/{$weby.id}/'),
                          'facebook-share-dialog',
                          'width=626,height=436');
                        return false;">
        <span class="share-icon social-facebook"></span></a>

    <!-- TWITTER SHARING -->

    <a class="twitter"
       href="http://twitter.com/intent/tweet?source=sharethiscom&text={$weby.title} {$viewObject.webPath}{$weby.slug}/{$weby.id}/ @WebyIO&url={$viewObject.webPath}">
        <span class="share-icon social-twitter"></span></a>
    </a>
    {literal}
        <script>!function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + '://platform.twitter.com/widgets.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, 'script', 'twitter-wjs');</script>
    {/literal}

    <!-- GOOGLE+ SHARING -->
    {literal}
        <a href="https://plus.google.com/share?url=http;//weby.io/url-2-page" onclick="javascript:
                window.open(this.href, '', 'menubar=no,toolbar=no,resizable=no,scrollbars=no,height=600,width=600');
                return false;">
            <span class="share-icon social-google"></span></a>
    {/literal}
</div>