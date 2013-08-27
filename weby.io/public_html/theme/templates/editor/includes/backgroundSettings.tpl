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
        <div id="color-picker"></div>
    </div>
    <div id="tab-pattern" class="tab">
        <div id="patternsList"></div>
        <div id="patternsPager" class="k-pager-wrap"></div>
        Powered by <a target="_blank" href="http://subtlepatterns.com">SubtlePatterns.com</a>
    </div>
    <div id="tab-image" class="tab">
        <div id="file-widget">
            <input name="background-image" id="file" type="file"/>
        </div>
        <a id="background-settings-limit" href="javascript:void(0)" class="button">Limit content</a>
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
        <input type="text" id="background-settings-youtube" value="http://www.youtube.com/watch?v=Zs4cjyYR6c0"
               placeholder="Paste a Youtube video for the background and press Enter"/>
    </div>
    <div id="tab-size" class="tab">
        <span>Canvas width and height in pixels (Leave blank for auto-size):</span><br />
        <input type="text" id="canvas-width" placeholder="Width" value="800"/><br />
        <input type="text" id="canvas-height" placeholder="Height" value="750"/>
        <a id="background-size-apply" href="javascript:void(0)" class="button">Apply</a>
    </div>
    {*<span style="float:right">
        <a id="background-settings-apply" href="javascript:void(0)" class="button">Apply</a>
        <a id="background-settings-cancel" href="javascript:void(0)" class="button">Cancel</a>
    </span>*}
</div>