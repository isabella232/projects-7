function PreziWidget() {

	this._widgetClass = 'prezi-widget';
	this._resizableOptions['minWidth'] = 300;
	this._resizableOptions['minHeight'] = 300;
	this._parseErrorMessage = 'We couldn\'t insert your presentation. Please try a different one.';
	this._inputElement = 'textarea';
	this._loadingMessage = 'Loading your Prezi presentation...'

	this.getHTML = function () {
		this._html = '<textarea placeholder="Paste a Prezi embed iframe or embed URL">' + test + '</textarea>' +
			'<span class="message"></span>';
		return BaseIframeWidget.prototype.getHTML.call(this);
	};

	this.getIframe = function (input) {
		return this.parsePreziLink(input);
	}

	this.parsePreziLink = function (link) {
		var original = link;
		var width = 550;
		var height = 400;
		if (link.indexOf('iframe') >= 0) {
			var regex = /src="(.*?)"/;
			link = original.match(regex) ? RegExp.$1 : false;
		}
		// Validate link
		var regex = /https?:\/\/(?:www\.)?prezi.com\/embed\/(.*?)\//;
		var preziId = link.match(regex) ? RegExp.$1 : false;

		var id = 'prezi-iframe-' + this._id;
		this._alsoResize = "#" + id;
		if (preziId) {
			return '<iframe id="' + id + '" src="' + WEB + 'embed/prezi/?preziId=' + preziId + '" width="' + width + '" height="' + height + '" frameBorder="0"></iframe>';
		}
		return  false;
	}

	BaseIframeWidget.prototype.init.call(this);

	/*var test = 'http://prezi.com/embed/f2eb2757342dc679050f1d1d6b098920375ffd86/?wmode=opaque&bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;features=undefined&amp;disabled_features=undefined';*/
	var test = 'http://prezi.com/embed/f2eb2757342dc679050f1d1d6b098920375ffd86/';
}

PreziWidget.prototype = new BaseIframeWidget();
PreziWidget.prototype.constructor = PreziWidget;

/*
 <object width="550" height="400" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" name="prezi_f2eb2757342dc679050f1d1d6b098920375ffd86" id="prezi_f2eb2757342dc679050f1d1d6b098920375ffd86">
 <param value="opaque" name="wmode">
 <param value="http://prezi.com/bin/preziloader-external-36538-alternate.swf" name="movie">
 <param value="true" name="allowfullscreen">
 <param value="true" name="allowfullscreeninteractive">
 <param value="always" name="allowscriptaccess">
 <param value="#ffffff" name="bgcolor">
 <param value="mediaservice-ends-conv,pservice,simpleshare,haxe-snapper,duplicate-mirrored,reuse-personal-library,template-2012,sound,meeting-redesign,meeting-urls-fix,flash-update-warning,master-lod,frame-layout-changer,reuse-user-themes,embed-player-in-showmode,log-editor-filename,embed-player-redesign,zoom-pointer-no-animation,ignore-after-fullscreen-allow,clipart-2012,menu-simpleshare,meeting-save-fail-retry,intro-video-ribbon,chrome-clipboard-fix,meeting-waiting-screen,desktop-media-sync,use-ztext-by-default,ztext-background,meeting-new-backend,jsmodules,use-haxe-uploader,mediaservice,share-zip,quick-prezi" name="features">
 <param value="prezi_id=f2eb2757342dc679050f1d1d6b098920375ffd86&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0&amp;time_till_new=0&amp;logtoken_header=MAC%20id%3D%22%22%2C%20ts%3D%221375820752%22%2C%20nonce%3D%22n6HKCk1b%22%2C%20ext%3D%22eyJwYXlsb2FkX3ZlcnNpb24iOiAxLCAiZGF0YSI6IHsidXNlcl9pZCI6IDB9LCAic2VydmljZSI6ICJsb2cifQ%3D%3D%22%2C%20mac%3D%22bgSZ2MNctE8GxHoBSeFzzHbCPrcLALR68Si7oYiBqDo%3D%22&amp;logtoken_method=POST&amp;logtoken_url=https%3A//log.prezi.com/log/&amp;readpresentationtoken_header=MAC%20id%3D%22%22%2C%20ts%3D%221375820752%22%2C%20nonce%3D%227WvYKq63%22%2C%20ext%3D%22eyJwYXlsb2FkX3ZlcnNpb24iOiAxLCAidXNlcl9pZCI6IG51bGwsICJzZXJ2aWNlIjogInN0b3JhZ2UiLCAicHJlc2VudGF0aW9uX2lkIjogMzM0NTU2MTYsICJsb2dfa3BpIjogdHJ1ZSwgImNsaWVudF90eXBlIjogImNsaWVudCJ9%22%2C%20mac%3D%22wiqaQx/PKs00jqLZqmqutV1f%2Bi0CTWK24p1WJfeLk4Q%3D%22&amp;readpresentationtoken_method=GET&amp;readpresentationtoken_url=https%3A//0901.static.prezi.com/presentation/njxhoc9eweyp/&amp;abtesttoken_header=MAC%20id%3D%22%22%2C%20ts%3D%221375820752%22%2C%20nonce%3D%22CqGQ07cI%22%2C%20ext%3D%22eyJwYXlsb2FkX3ZlcnNpb24iOiAxLCAiZGF0YSI6IHsidXNlcl9pZCI6IDB9LCAic2VydmljZSI6ICJhYnRlc3QifQ%3D%3D%22%2C%20mac%3D%22qd1VLVwblQDbNrHomJsdFt7TXxQ9aB1o1LjwAQ6YT2I%3D%22&amp;abtesttoken_method=POST&amp;abtesttoken_url=https%3A//abtest.prezi.com/init/&amp;features=mediaservice-ends-conv,pservice,simpleshare,haxe-snapper,duplicate-mirrored,reuse-personal-library,template-2012,sound,meeting-redesign,meeting-urls-fix,flash-update-warning,master-lod,frame-layout-changer,reuse-user-themes,embed-player-in-showmode,log-editor-filename,embed-player-redesign,zoom-pointer-no-animation,ignore-after-fullscreen-allow,clipart-2012,menu-simpleshare,meeting-save-fail-retry,intro-video-ribbon,chrome-clipboard-fix,meeting-waiting-screen,desktop-media-sync,use-ztext-by-default,ztext-background,meeting-new-backend,jsmodules,use-haxe-uploader,mediaservice,share-zip,quick-prezi&amp;disabled_features=&amp;is_owner=0" name="flashvars">
 <embed wmode="opaque" width="550" height="400" flashvars="prezi_id=njxhoc9eweyp&amp;lock_to_path=0&amp;&amp;autoplay=0&amp;autohide_ctrls=0&amp;time_till_new=0&amp;logtoken_header=MAC%20id%3D%22%22%2C%20ts%3D%221375820752%22%2C%20nonce%3D%22n6HKCk1b%22%2C%20ext%3D%22eyJwYXlsb2FkX3ZlcnNpb24iOiAxLCAiZGF0YSI6IHsidXNlcl9pZCI6IDB9LCAic2VydmljZSI6ICJsb2cifQ%3D%3D%22%2C%20mac%3D%22bgSZ2MNctE8GxHoBSeFzzHbCPrcLALR68Si7oYiBqDo%3D%22&amp;logtoken_method=POST&amp;logtoken_url=https%3A//log.prezi.com/log/&amp;readpresentationtoken_header=MAC%20id%3D%22%22%2C%20ts%3D%221375820752%22%2C%20nonce%3D%227WvYKq63%22%2C%20ext%3D%22eyJwYXlsb2FkX3ZlcnNpb24iOiAxLCAidXNlcl9pZCI6IG51bGwsICJzZXJ2aWNlIjogInN0b3JhZ2UiLCAicHJlc2VudGF0aW9uX2lkIjogMzM0NTU2MTYsICJsb2dfa3BpIjogdHJ1ZSwgImNsaWVudF90eXBlIjogImNsaWVudCJ9%22%2C%20mac%3D%22wiqaQx/PKs00jqLZqmqutV1f%2Bi0CTWK24p1WJfeLk4Q%3D%22&amp;readpresentationtoken_method=GET&amp;readpresentationtoken_url=https%3A//0901.static.prezi.com/presentation/njxhoc9eweyp/&amp;abtesttoken_header=MAC%20id%3D%22%22%2C%20ts%3D%221375820752%22%2C%20nonce%3D%22CqGQ07cI%22%2C%20ext%3D%22eyJwYXlsb2FkX3ZlcnNpb24iOiAxLCAiZGF0YSI6IHsidXNlcl9pZCI6IDB9LCAic2VydmljZSI6ICJhYnRlc3QifQ%3D%3D%22%2C%20mac%3D%22qd1VLVwblQDbNrHomJsdFt7TXxQ9aB1o1LjwAQ6YT2I%3D%22&amp;abtesttoken_method=POST&amp;abtesttoken_url=https%3A//abtest.prezi.com/init/&amp;features=mediaservice-ends-conv,pservice,simpleshare,haxe-snapper,duplicate-mirrored,reuse-personal-library,template-2012,sound,meeting-redesign,meeting-urls-fix,flash-update-warning,master-lod,frame-layout-changer,reuse-user-themes,embed-player-in-showmode,log-editor-filename,embed-player-redesign,zoom-pointer-no-animation,ignore-after-fullscreen-allow,clipart-2012,menu-simpleshare,meeting-save-fail-retry,intro-video-ribbon,chrome-clipboard-fix,meeting-waiting-screen,desktop-media-sync,use-ztext-by-default,ztext-background,meeting-new-backend,jsmodules,use-haxe-uploader,mediaservice,share-zip,quick-prezi&amp;disabled_features=&amp;is_owner=0" bgcolor="#ffffff" allowscriptaccess="always" allowfullscreeninteractive="true" allowfullscreen="true" type="application/x-shockwave-flash" src="http://prezi.com/bin/preziloader-external-36538-alternate.swf" name="preziEmbed_f2eb2757342dc679050f1d1d6b098920375ffd86" data-prezi="true" id="preziEmbed_f2eb2757342dc679050f1d1d6b098920375ffd86">
 </object>*/