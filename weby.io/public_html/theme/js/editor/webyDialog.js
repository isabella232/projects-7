/**
 * Shows Weby dialog (Weby name, tags)
 * @constructor
 */

function WebyTitleDialog() {

    App.addEventListener(this);

    var _dialogOpener = $('[data-role="weby-title"]');
    var _webyDialog = $('#weby-dialog');
    var _titleInput = $('#weby-title-field');
    var _tagsInput = $('#weby-tags-wrapper input');
    var _tagsData = $('.weby-tags');
    var _descriptionInput = $('#weby-description-field');
    var _tagsDropdown = $('#weby-tags-dropdown');
    var _tagsList = $('#tags-list');
    var _editing = false;

    var init = function () {
        _bindDialogGeneralActions();
        _bindTagSearching();

        _checkTitle();
    }

    /**
     * If title is empty, then automatically show dialog to fill this information
     * @private
     */
    var _checkTitle = function() {
        if (App.getWeby().getTitle() == '') {
            _dialogOpener.click();
        }
    }

    /**
     * Binding general actions (save, close, open)
     * @private
     */
    var _bindDialogGeneralActions = function () {
        // Opening dialog
        _dialogOpener.click(function () {
            _editing = true;
            $.fancybox(_webyDialog, {
                modal: true,
                type: 'inline',
                width: 500,
                height: 'auto',
                autoSize: false
            });
        });

        // Closing dialog
        $('[data-role="weby-dialog-close"]').click(function () {
            $.fancybox.close();
            _editing = false;
            clearTagsInput();
            _cancelAllChanges();
        });

        // Save button
        $('[data-role="weby-dialog-save"]').click(function () {
            App.getWeby().setTitle(_titleInput.val());
            App.getWeby().setTags(generateTagsJson());
            App.getWeby().setDescription(_descriptionInput.val());

            App.getWeby().save();
            $.fancybox.close();
            clearTagsInput();
        });

    }

    /**
     * Bind tag searching
     * @private
     */
    var _bindTagSearching = function () {
        _tagsInput.on('input', function () {
            var search = $(this).val();
            if (search.length > 0) {
                $.ajax({
                    url: WEB + 'tools/tags/?search=' + search,
                    success: function (response) {
                        if (response) {
                            _tagsList.empty();
                            for (var i in response) {
                                _tagsList.append('<li data-tag="' + response[i].tag + '" data-id="' + response[i].id + '">' + response[i].tag + '</li>')
                            }
                            _tagsDropdown.show();
                        }
                    }
                });
            } else {
                _tagsDropdown.hide();

            }
        });
    }

    /**
     * Generates JSON out of added span items (tags)
     * @returns {Array}
     */
    var generateTagsJson = function () {
        var json = [];
        _tagsData.find('span').each(function () {
            var current = $(this);
            json.push({id: current.data('id'), tag: current.data('tag')});
        });
        return json;
    }

    /**
     * Refreshes span tags with (because of inserting data-id for newly created tags)
     */
    var _refreshTagData = function (data) {
        _tagsData.empty();
        for (var i in data) {
            _tagsData.append('<span data-tag="' + data[i].tag + '" data-id="' + data[i].id + '"class="weby-tag">' + data[i].tag + '</span>');
        }
    }

    /**
     * Puts tag into added list, hides suggested tags list and clears input
     * @param id
     * @param tag
     */
    var addToList = function (id, tag) {
        _tagsData.append('<span data-tag="' + tag + '" data-id="' + id + '"class="weby-tag">' + tag + '</span>');
        clearTagsInput();
    }

    var clearTagsInput = function () {
        _tagsInput.val('');
        _tagsList.empty();
        _tagsDropdown.hide();
    }
    /**
     * When user presses "Enter" on tags input, insert new tag into added list
     */
    _tagsInput.keypress(function (e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;
        if (charCode == '13') {
            addToList(0, $(this).val());
        }
    });

    /**
     * When user clicks on tag in a dropdown list, add selected tag to added list
     */
    _tagsList.on('click', 'li', function () {
        addToList($(this).data('id'), $(this).data('tag'));
        _tagsList.empty();
        _tagsDropdown.hide();
    });

    _cancelAllChanges = function() {
        _titleInput.val(App.getWeby().getTitle());
        _descriptionInput.val(App.getWeby().getDescription());
        _refreshTagData(App.getWeby().getTags());
    }

    this.webyLoaded = function () {
        init();
    }

    this.webySaved = function (data) {
        if(_editing) {
            return;
        }
        _refreshTagData(data.tags);

        _editing = false;
    }
}