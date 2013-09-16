{extends file="layouts/empty.tpl"}
{block name="content"}
    <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
    <div class="g-post" data-href="https://plus.google.com/{$userId}/posts/{$postId}"></div>
{/block}