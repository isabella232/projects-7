<div id="background-settings">
    <ul>
        <li>
            <a href="#cnv-color">Color</a>
        </li>
        <li>
            <a href="#cnv-pattern">Pattern</a>
        </li>
        <li>
            <a href="#cnv-image">Image</a>
        </li>
        <li>
            <a href="#cnv-youtube">Youtube</a>
        </li>
        <li>
            <a href="#cnv-size">Size</a>
        </li>
    </ul>
    <div id="cnv-color" class="tab">
        <div id="color-picker" style="width: 264px; border: none;"></div>
    </div>
    <div id="cnv-pattern" class="tab">
        <div id="patternsList" class="patternsList"></div>
        <div class="k-pager-wrap patternsPager"></div>
        <span class="credits">
            Powered by <a target="_blank" href="http://subtlepatterns.com">SubtlePatterns.com</a>
        </span>
    </div>
    <div id="cnv-image" class="tab">
        <span class="file-error"></span>

        <div id="file-widget">
            <input name="background-image" id="file" type="file"/>
        </div>
        <div class="button-wrapper">
            <a id="background-image-remove" href="javascript:void(0)"
               style="display: block; text-align: center;">Remove background image</a>
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
    <div id="cnv-youtube" class="tab">
        <input type="text" id="background-settings-youtube" value="https://www.youtube.com/watch?v=kr_gROZmTtA"
               placeholder="Paste a Youtube video URL"/>
    </div>
    <div id="cnv-size" class="tab">
        <label>Width:<input type="text" id="canvas-width" placeholder="Width" value="800"/></label>
        <label>Height:<input type="text" id="canvas-height" placeholder="Height" value="750"/></label>
        <span class="label">(Leave blank for auto-size)</span>
    </div>
</div>