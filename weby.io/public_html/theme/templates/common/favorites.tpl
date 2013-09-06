{if $viewObject->user}
<script type="text/javascript">
    $(function () {
        new WebyFavorites();
    });
</script>

<div class="modal-dialog" id="my-favorites-dialog" style="display:none">
    <h1>My Favorites</h1>

    <div id="favoritesList"></div>
    <div id="favoritesPager"></div>
</div>
{/if}