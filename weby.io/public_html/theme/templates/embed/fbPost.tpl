{extends file="layouts/empty.tpl"}
{block name="head"}
    <script type="text/javascript">
        $(window).load(function () {
            var interval = setInterval(function(){
                if($('iframe[title*=post]').length > 0){
                    clearInterval(interval);
                    var el = $('iframe[title*=post]');
                    el.bind("load", function(){
                        var sizeInterval = setInterval(function(){
                            if(el.attr("style").indexOf("width") > -1 && el.attr("style").indexOf("height") > -1){
                                clearInterval(sizeInterval);
                                setTimeout(function(){
                                    var widget = window.top['App'].getWeby().getWidget({$parentId});
                                    if (widget) {
                                        widget.onIframeLoaded(el.css("width"), el.css("height"));
                                    }
                                }, 1000);
                            }
                        }, 20);
                    });
                }
            }, 50);
        });
    </script>
{/block}
{block name="content"}
    <div id="fb-root"></div>
    <script>(function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=589844551062032";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    <div class="fb-post" data-href="https://www.facebook.com/{$fbUrl}"></div>
{/block}