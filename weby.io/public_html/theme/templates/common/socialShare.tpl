<!-- TODO: refactor A LOT (move to separate file, change logic of initializing and general logic -->

<script type="text/javascript">

    var SocialShare = {
        // Share buttons
        facebookBtn: null,
        googleBtn: null,
        twitterBtn: null,

        /**
         * Initialize social share functionality
         */
        init: function () {
            this.facebookBtn = $('.share-icon.social-facebook');
            this.googleBtn = $('.share-icon.social-google');
            this.twitterBtn = $('.share-icon.social-twitter');

            // Binding event handlers
            this._bindFacebookShare();
            this._bindTwitterShare();
            this._bindGoogleShare();
        },

        /**
         * Event handler - Facebook share button
         * @private
         */
        _bindFacebookShare: function () {
            this.facebookBtn.click(function () {
                window.open(
                        'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('{$weby.publicUrl}'),
                        'facebook-share-dialog', 'width=626,height=436');
            });
        },


        /**
         * Event handler - Twitter share button
         * @private
         */
        _bindTwitterShare: function () {
            this.twitterBtn.click(function () {
                window.open(
                        'http://twitter.com/intent/tweet?source=sharethiscom&text={$weby.title} {$weby->getPublicUrl()} @WebyIO&url={$viewObject.webPath}',
                        'twitter-share-dialog', 'width=626,height=436');
            });
        },

        /**
         * Event handler - Google share button
         * @private
         */
        _bindGoogleShare: function () {
            this.googleBtn.click(function () {
                window.open(
                        'https://plus.google.com/share?url={$weby->getPublicUrl()}',
                        'google-share-dialog', 'width=626,height=436');
            });
        }
    }

    $(function () {
        SocialShare.init();
    })

</script>

<!-- SHARING ICONS -->
{if $weby}
    <div class="social-icons-wrapper">
        {if (!isset($editor) || !$editor) && $weby.user.id != $viewObject.user.id}
            <a href="javascript: void(0);" id="add-to-favs">
                <span class="share-icon social-favorites{if $weby->isInFavorites()}-added{/if}"></span></a>
        {/if}
        <!-- FACEBOOK SHARING -->
        <span class="share-icon social-facebook"></span>
        {$weby.shareCount.facebook}

        <!-- TWITTER SHARING -->
        <span class="share-icon social-twitter"></span>
        {$weby.shareCount.twitter}

        <!-- GOOGLE+ SHARING -->
        <span class="share-icon social-google"></span>
        {$weby.shareCount.google}
    </div>
{/if}