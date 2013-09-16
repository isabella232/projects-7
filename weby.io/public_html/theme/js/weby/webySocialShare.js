function SocialShare() {
    // Share buttons
    var facebookBtn = $('[data-role="facebook-share"]');
    var googleBtn = $('[data-role="gplus-share"]');
    var twitterBtn = $('[data-role="twitter-share"]');
    var favoriteBtn = $('[data-role="add-to-favorite"]');

    /**
     * Event handler - Facebook share button
     * @private
     */
    var _bindFacebookShare = function () {
        facebookBtn.click(function () {
            window.open(
                'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(App.getWeby().getPublicUrl() +
                    '?utm_source=share-facebook&utm_medium=social&utm_campaign=' + App.getWeby().getSlug() + '-' + App.getWeby().getId()),
                'facebook-share-dialog', 'width=626,height=436');
        });
    }

    /**
     * Event handler - Twitter share button
     * @private
     */
    var _bindTwitterShare = function () {
        twitterBtn.click(function () {
            window.open(
                'http://twitter.com/intent/tweet?source=sharethiscom&text=' +
                    App.getWeby().getTitle() + ' ' + encodeURIComponent(App.getWeby().getPublicUrl() +
                    '?utm_source=share-twitter&utm_medium=social&utm_campaign=' + App.getWeby().getSlug() + '-' + App.getWeby().getId()) +
                    ' via @WebyIO&url=' + App.getWeby().getPublicUrl(),
                'twitter-share-dialog', 'width=626,height=436');
        });
    }

    /**
     * Event handler - Google share button
     * @private
     */
    var _bindGoogleShare = function () {
        googleBtn.click(function () {
            window.open(
                'https://plus.google.com/share?url=' + encodeURIComponent(App.getWeby().getPublicUrl() +
                    '?utm_source=share-google&utm_medium=social&utm_campaign=' + App.getWeby().getSlug() + '-' + App.getWeby().getId()),
                'google-share-dialog', 'width=626,height=436');
        });
    }


    /**
     * Event handler - Google share button
     * @private
     */
    var _bindAddToFavorite = function () {
        favoriteBtn.click(function () {
            $.ajax({
                url: WEB + 'tools/favorite/52307e3559480/',
                success: function(){
                    // TODO: toggle class
                    favoriteBtn.toggleClass('in-favorites');
                }
            })
        });
    }

    /**
     * Bind event handlers
     */
    _bindFacebookShare();
    _bindTwitterShare();
    _bindGoogleShare();
    _bindAddToFavorite();
}

$(function () {
    new SocialShare();
});
