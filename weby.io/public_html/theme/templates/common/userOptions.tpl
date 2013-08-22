    <!-- USER OPTIONS -->
    <div class="user-options-wrapper">
        <a href="{$viewObject.webPath}"><img style="display: inline-block" src="{$viewObject.user.avatarUrl}"id="user-avatar"></a>
        <div class="user-data" style="display: inline-block; vertical-align: top">
            <b>{$viewObject.user.firstName} {$viewObject.user.lastName}</b><br/>
            <a href="{$viewObject.webPath}logout">Log out</a>
        </div>
    </div>