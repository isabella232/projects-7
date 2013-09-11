<div id="background-settings">
    <ul class="tabs">
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

        <div class="select-background">
            <a href="">Select background position</a>
            <ul>
                <li>
                    <a id="background-settings-aligned" href="">Aligned</a>
                </li>
                <li>
                    <a id="background-settings-repeat" href="">Repeat</a>
                </li>
                <li>
                    <a id="background-settings-fixed" href="">Fixed</a>
                </li>
                <li>
                    <a id="background-settings-scale" href="">Scale</a>
                </li>
            </ul>
        </div>

        <div class="select-background">
            <a href="">Select image alignment</a>
            <ul>
                <li>
                    <a href="javascript:void(0)" data-align="left top">Top left</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-align="center top">Top center</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-align="right top">Top right</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-align="left center">Left</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-align="center center">Center</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-align="right center">Right</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-align="left bottom">Bottom left</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-align="center bottom">Bottom</a>
                </li>
                <li>
                    <a href="javascript:void(0)" data-align="right bottom">Bottom right</a>
                </li>
            </ul>
        </div>
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