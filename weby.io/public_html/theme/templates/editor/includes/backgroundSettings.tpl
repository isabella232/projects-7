<div id="background-settings">
    <ul>
        <li class="k-state-active">
            Color
        </li>
        <li>
            Pattern
        </li>
        <li>
            Image
        </li>
        <li>
            Youtube
        </li>
        <li>
            Size
        </li>
    </ul>
    <div id="tab-color" class="tab">
        <div id="color-picker" style="width: 264px; border: none;"></div>
    </div>
    <div id="tab-pattern" class="tab">
        <div id="patternsList" class="patternsList"></div>
        <div class="k-pager-wrap patternsPager"></div>
        Powered by <a target="_blank" href="http://subtlepatterns.com">SubtlePatterns.com</a>
    </div>
    <div id="tab-image" class="tab">
        <span class="file-error"></span>

        <div id="file-widget">
            <input name="background-image" id="file" type="file"/>
        </div>
        <div class="button-wrapper">
            <a id="background-image-remove" href="javascript:void(0)" class="button" style="display: block; text-align: center;">Remove background image</a>
        </div>
        <a id="background-settings-aligned" href="javascript:void(0)" class="button">Aligned</a>
        <a id="background-settings-repeat" href="javascript:void(0)" class="button">Repeat</a>
        <a id="background-settings-fixed" href="javascript:void(0)" class="button">Fixed</a>
        <a id="background-settings-scale" href="javascript:void(0)" class="button">Scale</a>
        <table id="background-settings-align">
            <tbody>
            <tr>
                <td>
                    <button data-align="left top">TL</button>
                </td>
                <td>
                    <button data-align="center top">TC</button>
                </td>
                <td>
                    <button data-align="right top">TR</button>
                </td>
            </tr>
            <tr>
                <td>
                    <button data-align="left center">L</button>
                </td>
                <td>
                    <button data-align="center center">C</button>
                </td>
                <td>
                    <button data-align="right center">R</button>
                </td>
            </tr>
            <tr>
                <td>
                    <button data-align="left bottom">BL</button>
                </td>
                <td>
                    <button data-align="center bottom">BC</button>
                </td>
                <td>
                    <button data-align="right bottom">BR</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div id="tab-youtube" class="tab">
        <input type="text" id="background-settings-youtube" value="https://www.youtube.com/watch?v=kr_gROZmTtA"
               placeholder="Paste a Youtube video for the background and press Enter"/>
    </div>
    <div id="tab-size" class="tab">
        <span>Canvas width and height in pixels (Leave blank for auto-size):</span><br/>
        <input type="text" id="canvas-width" placeholder="Width" value="800"/><br/>
        <input type="text" id="canvas-height" placeholder="Height" value="750"/>
        <br/>
        <a id="background-size-auto" href="javascript:void(0)" class="button">Fill my screen</a>
    </div>
</div>

<div id="document-background-settings" style="display:none">
    <ul>
        <li class="k-state-active">
            Color
        </li>
        <li>
            Pattern
        </li>
    </ul>
    <div class="tab">
        <div id="document-color-picker" style="width: 264px; border: none;"></div>
    </div>
    <div class="tab">
        <div id="documentPatternsList" class="patternsList"></div>
        <div class="k-pager-wrap patternsPager"></div>
        Powered by <a target="_blank" href="http://subtlepatterns.com">SubtlePatterns.com</a>
    </div>
</div>

<div id="outer-widgets" style="display:none">
    <p>There are some widgets located outside of your new canvas.<br/> Would you like to move them inside your new
        canvas?</p>
    <button id="button-move-widgets">Yes, sure!</button>
    <button id="button-dont-move-widgets">No, leave them.</button>
</div>