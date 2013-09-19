<div class="dialog" id="feedback-dialog" style="display: none">
    <div class="enter-message" data-show-all="{if !$viewObject.user}1{else}0{/if}">
    <h1>Your Feedback</h1>

    <p>If you have anything to tell us, please leave us a message! We would be glad to hear from you!</p>

        {if !$viewObject.user}
            <input class="has-tooltip name" title="Please enter your name." placeholder="Name"/>
            <input class="has-tooltip email" title="Please enter valid email address."  placeholder="E-mail""/>
        {/if}
        <textarea class="has-tooltip" title="Please enter your message" placeholder="Enter your message here"></textarea>

    <p class="buttons">
        <span class="button main" data-role="feedback-send">Send</span>
    </p>
    </div>
    <div class="end-message">
        <p>Thank you for your feedback, see you soon!</p>
        <p><b>Weby.io team</b></p>
    </div>
</div>