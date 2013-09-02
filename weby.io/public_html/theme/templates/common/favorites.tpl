<script type="text/javascript">
    var myFavoriteWebies = {$viewObject->user->getFavoriteWebies(true)};
    $(function () {
        try{
        new WebyFavorites();
        } catch(e) {
            console.error("WebyFavorites: "+e.message);
        }
    });
</script>

<div class="modal-dialog" id="my-favorites-dialog" style="display:none">
    <h1>My Favorites</h1>

    <div id="favoritesList"></div>
    <div id="favoritesPager"></div>
</div>