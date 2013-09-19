/**
 * Used for making an introduction to newly registered users
 * @constructor
 */
function Intro() {

    var content = $('body.editor');

    content.append('<div class="inserted-intro" id="smtg" style="position: absolute; left: 50%; top: 50%">' +
        'Welcome to Weby.io! ' +
        'Since this is your first time you logged in, ' +
        'you can check this short introduction! </div>');

    // Steps, add as many as you like, the order is applied as elements are inserted into steps array
    var steps = [
        {element: $('#toolbar'), text: 'These are the widgets you can use, just pick one and drag it to the workspace! It\'s that easy!', position: 'bottom'},
        {element: $('#toolbar-wrapper'), text: 'These are the widgets you can use, just pick one and drag it to the workspace! It\'s that easy!', position: 'right'},
        {element: $('#weby-toolbar-wrapper'), text: 'Once you insert a widget, you can manipulate them using these buttons.', position: 'left'},
        {element: $('div.header-middle'), text: 'This is your Weby name and URL which you can share with the rest of the world...', position: 'right'},
        {element: $('#social-sharing'), text: '...or you can do it also with a single click using social networks! How cool is that?', position: 'bottom'},
        {element: $('li.my-webies'), text: 'From here you can check your Webies and create new ones! Create as many as you like!', position: 'right'},
        {element: $('#user-menu'), text: 'And some extra goodies can be found here.', position: 'left'},
    ];

    // It gets all steps and attaches neccessary data tags to each one
    var init = function () {
        for (var i in steps) {
            steps[i].element.attr('data-step', i).attr('data-intro', steps[i].text).attr('data-position', steps[i].position);
        }

        // Start intro.js introduction
        introJs().start()
            .setOptions ({exitOnEsc: false, exitOnOverlayClick: false})
            .oncomplete(function () {
                $('.inserted-intro').remove();
                $.ajax({
                    url: WEB + 'user/intro-done'
                })
            });
    };

    // Callback function, intro will execute after Weby has been completely loaded
    this.webyLoaded = function (data) {
        init();
    }
}