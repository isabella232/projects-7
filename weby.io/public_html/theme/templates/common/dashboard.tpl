<script type="text/javascript" id="myWebiesScript">
    var myWebies = {if $viewObject->user}{$viewObject->user->getWebies(true)}{else}false{/if};
    $(function(){
        $('#myWebiesScript').remove();
    });
</script>
<div id="my-webies-dialog" style="display:none">
    <div id="webiesList"></div>
    <div id="webiesPager"></div>
    <a href="/editor/create/" class="button" style="margin-top:20px">Create new Weby</a>
</div>

<style type="text/css">
    #my-webies-dialog {
        width: 400px;
        height: 400px;
        position: absolute;
    }
</style>

