{* Description: Weby.io Master Layout

 Available blocks:
    - title
    - head
    - content
*}
<!DOCTYPE html>
<html>
<head>
    <title>{block name="title"}{/block} | Weby.io</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="utf-8">
    {include file="layouts/editorIncludes.tpl"}
    {block name="head"}{/block}
</head>
<body>
<div id="header">
    <div id="header-content">
        <h2>Weby.io<img src="{$viewObject.themeWebPath}images/webiny.png"/></h2>
        <h4>Create and share your content instantly</h4>
    </div>
</div>
{block name="content"}{/block}
</body>
</html>
