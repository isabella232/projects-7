<li class="dropdown">
    <span class="user-photo"><a href="{$viewObject.webPath}"><img style="display: inline-block; width:40px; height:40px" src="{$viewObject.user.avatarUrl}"
                                                                  id="user-avatar"></a></span>
    <span class="username">{$viewObject.user.firstName} {$viewObject.user.lastName}</span>
    <span class="dropdown-arrow"></span>
    <ul>
{*        <li>
            <a href="">Your profile</a>
        </li>*}
        <li>
            <a href="javascript:void(0);" data-role="my-webies">Your webies</a>
        </li>
{*        <li>
            <a href="">Settings</a>
        </li>*}
        <li>
            <a href="{$viewObject.webPath}logout">Sign out</a>
        </li>
    </ul>
</li>