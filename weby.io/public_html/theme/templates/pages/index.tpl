{extends file="layouts/master.tpl"}

{block name="title"}Weby editor{/block}
{block name="head"}
{/block}
{block name="content"}
    <div style="margin: 150px; text-align: center">
        <a href="{$viewObject.editorPath}security/login-fb/">
            <img width=100 height=100 src="http://gallery.mailchimp.com/15ce5dffe745f7c0a1e50601e/images/fb_button.png">
        </a><br><a href="{$viewObject.editorPath}security/login-gp/">
            <img width=105 height=105 src="https://cdn1.iconfinder.com/data/icons/yooicons_set01_socialbookmarks/512/social_google_box.png">
        </a>
    </div>
{/block}