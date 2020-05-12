<!DOCTYPE HTML>
<html manifest="app.appcache">
  <head>
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width">
    <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0">
    <title>Universal Remote</title>
    <link rel="stylesheet" href="css/compiled/compiled.css" />
    {% include "./favicons.swig" %}
  </head>
  <body ontouchstart="">
    <div id="container">
      <h1 id="titlebar">
        <a class="back hidden"><div class="left-arrow"></div></a>
        <span id="title" data-text="Universal Remote">Universal Remote</span>
      </h1>
      <p class="offline-message">You are currently offline. <a id="offline-retry" href="/remote">Retry?</a></p>
      <ul class="remotes-nav">
      {% for remote in remotes %}
        {% set remoteName = loop.key %}
        <li><a class="btn btn-wide btn-large btn-info" href="#{{ remoteName }}">{{ labelForRemote(remoteName) }}</a></li>
      {% endfor %}
      </ul>

      <hr />

      <ul class="macros-nav">
      {% for macro in macros %}
        {% set macroName = loop.key %}
        <li><button class="btn btn-wide btn-large btn-warning macro-link" href="/macros/{{ macroName|url_encode }}">{{ macroName }}</button></li>
      {% endfor %}
      </ul> 


      <div class="prev"></div>

      <ul class="remotes">
      {% for remote in remotes %}
        {% set remoteName = loop.key %}
        <li class="remote" id="{{ remoteName }}">
          <ul class="commands">
          {% for command in remote %}
             <li class="command">
               <button class="command-link {% if repeaters[remoteName] && repeaters[remoteName][command] %}command-repeater{% else %}command-once{% endif %} btn btn-wide btn-large btn-primary" href="/remotes/{{ remoteName|url_encode }}/{{ command|url_encode }}">{{ labelForCommand(remoteName, command) }}</button>
             </li>
          {% endfor %}
          </ul>
        </li>
      {% endfor %}
      </ul>
    </div>

    <div class="next"></div>

    <footer>
	    <p><a href="/refresh">Refresh</a></p>
      <p><a href="http://iot.ariba.org.in/">MyIot Universal Remote</a></p>
      <p> Remote Control Configured by Nagesh </p>
    </footer>

    <script src="js/compiled/app.js" type="text/javascript" charset="utf-8"></script>
  </body>
</html>
