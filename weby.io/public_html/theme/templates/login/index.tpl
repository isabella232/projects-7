<!DOCTYPE HTML>
<head>
    <title>Writeo - create and share your content instantly</title>
    <meta name="keywords" content=""/>
    <meta name="description" content=""/>
    <meta name="robots" content="index, follow"/>
    <meta charset="utf-8"/>

    <link type="text/css" rel="stylesheet" href="{$WEB_PATH}theme/css/style.css" media="screen"/>
</head>
<body>

<div id="wrapper">
    <div id="wrappertop"></div>

    <div id="wrappermiddle">

        <h2>Login</h2>

        <form action="{$WEB_PATH}login/process" method="POST">
            <div id="username_input">

                <div id="username_inputleft"></div>

                <div id="username_inputmiddle">
                    <input type="text" name="username" id="url" value="E-mail Address" onclick="this.value = ''">
                    <img id="url_user" src="{$WEB_PATH}theme//images/mailicon.png" alt="">
                </div>

                <div id="username_inputright"></div>

            </div>

            <div id="password_input">

                <div id="password_inputleft"></div>

                <div id="password_inputmiddle">
                    <input type="password" name="password" id="url" value="Password" onclick="this.value = ''">
                    <img id="url_password" src="{$WEB_PATH}theme/images/passicon.png" alt="">
                </div>

                <div id="password_inputright"></div>

            </div>

            <div id="submit">
                <input type="image" src="{$WEB_PATH}theme/images/submit_hover.png" id="submit1" value="Sign In">
                <input type="image" src="{$WEB_PATH}theme/images/submit.png" id="submit2" value="Sign In">
            </div>
        </form>


        <div id="links_left">

            <a href="#">Forgot your Password?</a>

        </div>

        <div id="links_right"><a href="#">Not a Member Yet?</a></div>

    </div>

    <div id="wrapperbottom"></div>

    <div id="powered">
        <p>What is Writeio? <a href="{$WEB_PATH}"> Learn more!</a></p>
    </div>
</div>

</body>
</html>