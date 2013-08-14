function TwitterWidget() {
	this._tweetId;
	this._tweetUrl;
	this._isResizable = false;
	this._widgetClass = 'twitter-widget';
	this._inputElement = 'textarea';
	this._parseErrorMessage = "Looks like this Tweet doesn't exist! Try a different one.";
	this._parser = null;

	this.getHTML = function () {
		this._html = '<textarea class="tweet-embed" placeholder="Paste your Tweet embed code here"></textarea>' +
			'<span class="message"></span>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		var $this = this;

		$this.hideResizeHandle();
		BaseWidget.prototype.onWidgetInserted.call($this);
		App.deactivateTool();
		this.input().bind("blur keydown",function (e) {
			// If key was pressed and it is not ENTER
			if (e.type == "keydown" && e.keyCode != 13) {
				return;
			}

			if ($.trim($this.input().val()) == '') {
				return;
			}

			if ($this._parser == null) {
				$this._parser = new TwitterParser();
			}

			$this.message().html('');

			// Regex check
			if (!($this._tweetUrl = $this._parser.parse($this.input().val()))) {
				return $this.showError();
			}

			// Validate content
			$this.showLoading('Let\'s see what we have here...', 'Validating your URL may take a few moments, please be patient.');
			$this.input().hide();
			$this.checkUrl($this._tweetUrl, function (data) {
				if (data.urlExists) {
					$this._tweetId = $this._parser.getTweetId();
					$this._tweetHtml = $this._parser.getTweetHtml();
					// Build embed code
					var tweetEmbed = '<blockquote class="twitter-tweet">' + $this._parser.getTweetHtml() + '</blockquote>' +
						'<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';

					$this.input().replaceWith(tweetEmbed);
					$this.hideLoading();
					$this._isContentLoaded = true;
				} else {
					// Show error
					$this.showError();
				}
			});
		}).focus();
	}

	this.showError = function () {
		this.hideLoading();
		this.message().html(this._parseErrorMessage);
		this.input().val('').show();
		if (this._isActive) {
			this.input().focus();
		}
		return;
	}

	BaseWidget.prototype.init.call(this);
}

// oembed: https://api.twitter.com/1/statuses/oembed.json?id=367360709379624961&align=center

TwitterWidget.prototype = new BaseWidget();
TwitterWidget.prototype.constructor = TwitterWidget;