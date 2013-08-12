{* Templates for various link types (eg. .gif, .jpg or files like .pdf, .ppt, .doc etc.) *}

{literal}
    <!-- Basic input field for pasting links which our widget will know how to handle -->
    <script type="weby/fileWidgetTemplate" id="file-widget-field-tpl">
        <div style="width: 400px">
            <input class="file-widget-field" id="file-widget-{id}" type="text" value="{value}"
                   placeholder="Paste a link to a file"/>
            <span class="dropbox-button"></span>
            <span class="gdrive-button"></span>
        </div>
    </script>

    <!-- Link template - used for web links that includes image, title and short content of site -->
    <script type="weby/fileWidgetTemplate" id="file-widget-file-tpl">
        <div style="400px">
            Embeded web page will be here!
        </div>
    </script>

    <!-- File template - used for types of files which displays basic information such as name, size etc. -->
    <script type="weby/fileWidgetTemplate" id="file-widget-file-tpl">
        <div style="400px">
            <a href="{url}"><span class="file-widget-type-icon type-{extension}"></span></a>
        <span class="file-widget-details">
            <table class="file-widget-file-details">
                <tr>
                    <td>Name:</td>
                    <td>{baseName}</td>
                </tr>
                <tr>
                    <td>Type:</td>
                    <td>{type}</td>
                </tr>
                <tr>
                    <td>Size:</td>
                    <td>{size}</td>
                </tr>
                <tr>
                    <td>Hosted on:</td>
                    <td>{host}</td>
                </tr>
            </table>
        </span>
        </div>
    </script>

    <!-- Image template - used for displaying images, this template doesn't include any file data -->
    <script type="weby/fileWidgetTemplate" id="file-widget-image-tpl">
        <img class="file-widget-image" src="{url}"></img>
    </script>

    <!-- Dropbox template - used for displaying files from dropbox service -->
    <script type="weby/fileWidgetTemplate" id="file-widget-dropbox-file-tpl">
        <a href="{url}"><span class="file-widget-type-icon type-dropbox}"></span></a>
        <span class="file-widget-details">
            <table class="file-widget-file-details">
                <tr>
                    <td>Name:</td>
                    <td>{baseName}</td>
                </tr>
                <tr>
                    <td>Type:</td>
                    <td>Drop</td>
                </tr>
                <tr>
                    <td>Size:</td>
                    <td>{size}</td>
                </tr>
                <tr>
                    <td>Hosted on:</td>
                    <td>{host}</td>
                </tr>
            </table>
        </span>
    </script>

    <!-- Error template - used for displaying error messages -->
    <script type="weby/fileWidgetTemplate" id="file-widget-error-tpl">
        <span class="file-widget-error">{message}</span>
    </script>
{/literal}