{extends file="layouts/embed.tpl"}

{block name="title"}{$weby.title}{/block}
{block name="head"}
    {include file="templates/pages/includes/appIncludes.tpl"}
    {include file="templates/pages/includes/appRemoteIncludes.tpl"}
    {include file="templates/common/linkWidgetTemplates.tpl"}
    <script type="text/javascript" id="initScript">
        var weby = {$weby->toJson()};
        $(window).resize(function () {
            $('#playWeby').css({
                'padding-top': (($('#playWeby').height() / 2) - $('#splash').outerHeight(true)) + 'px'
            });
        });

        $(function () {
            $(window).resize();
            $('#playWeby .button').click(function () {
                App = new AppClass(42);
                App.init();
                $('#playWeby').remove();
            });
            $('#initScript').remove();
        });
    </script>
{/block}
{block name="content"}
    <div id="playWeby">
        <div id="splash">
            <h3>Weby.io presents</h3>

            <h1>"{$weby.title}"</h1>
            <a href="javascript:void(0)" class="button">Click to see this Weby!</a>
        </div>
    </div>
    <div id="workspace">
        <div id="content-background">
            <div id="player"></div>
        </div>
        <div id="wrapper">
            <div id="content"></div>
            <div class="clearfix"></div>
        </div>
    </div>
{/block}
{block name="headerRightTools"}
    {include file="templates/common/socialShare.tpl"}
{/block}