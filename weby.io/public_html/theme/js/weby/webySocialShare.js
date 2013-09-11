function SocialShare() {
    // Share buttons
    var facebookBtn = $('[data-role="facebook-share"]');
    var googleBtn = $('[data-role="gplus-share"]');
    var twitterBtn = $('[data-role="twitter-share"]');

    /**
     * Event handler - Facebook share button
     * @private
     */
    var _bindFacebookShare = function () {
        facebookBtn.click(function () {
            window.open(
                'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(App.getWeby().getPublicUrl()),
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
                    App.getWeby().getTitle() + ' ' + App.getWeby().getPublicUrl() + ' via @WebyIO&url=' + App.getWeby().getPublicUrl(),
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
                'https://plus.google.com/share?url=' + encodeURIComponent(App.getWeby().getPublicUrl()),
                'google-share-dialog', 'width=626,height=436');
        });
    }

    /**
     * Bind event handlers
     */
    _bindFacebookShare();
    _bindTwitterShare();
    _bindGoogleShare();
}

$(function () {
    new SocialShare();
});
