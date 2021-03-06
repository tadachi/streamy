var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var GLOBALS = require('./GLOBALS.js');
var Util = require('./lib/util.js');
var TwitchAPI = require('./api_wrappers/twitch-api.js');
var HitboxAPI = require('./api_wrappers/hitbox-api.js');

// Components
var App = require('./App.jsx');
// var TwitchVideoPlayer = require('./components/TwitchVideoPlayer.jsx');
var CustomTwitchPlayer = require('./components/CustomTwitchPlayer.js');
var Chat = require('./components/Chat.jsx');
var HitboxPlayer = require('./components/HitboxPlayer.js');

var App;
var ParentChatComponent;
var ChatComponent;

var TwitchVideoPlayerComponent;
var HitboxVideoPlayerComponent;

var twitch = new TwitchAPI(GLOBALS.CLIENT_ID);
var hitbox = new HitboxAPI();
/*
 * Main
 */

// Handles implicit authentication to Twitch and its oAuth tokens.
if (Util.getQueryStringParams('closewindow')) { // Check querystring for closewindow=true, if so then we know that the user tried to auth.
    window.opener.sessionStorage.setItem('twitch_access_token', Util.getQueryStringParams('access_token'));
    window.opener.sessionStorage.setItem('twitch_scope', Util.getQueryStringParams('scope'));
    
    twitch.getUserObject(Util.getQueryStringParams('access_token'), function(data) {
        if (data) {
            window.opener.sessionStorage.setItem('display_name', data.display_name);
            window.opener.sessionStorage.setItem('name', data.name);           
        }
        window.close();
    });
}
// detected that it's not a new window getting twitch oauth token so remove the preview parlor trick and show the actual app.
else {
    // Remove the preview class and show the rest of the app.
    $('#flex_container').addClass('flex-container')
    $('#flex_search').addClass('flex-search');
    $('#flex_player').addClass('flex-player');
    $('#flex_chat').addClass('flex-chat');

    /* React */
    TwitchVideoPlayerComponent = new CustomTwitchPlayer('video_player');

    HitboxVideoPlayerComponent = new HitboxPlayer('video_player');

    ChatComponent = ReactDOM.render(
        <Chat parent_div_id='chat' iframe_div_id='iframe_chat'/>,
        document.getElementById('chat')
    );

    App = ReactDOM.render(
        <App
            search_div='flex_search'
            chat_div='flex_chat'
            player_div='flex_player'
            Chat={ChatComponent}
            TwitchPlayer={TwitchVideoPlayerComponent}
            HitboxPlayer={HitboxVideoPlayerComponent}
            />,
        document.getElementById('search_stream')
    );

};

// $(document).keydown(function(event) {
document.addEventListener('keydown', function(event) {
    if (App) {
        // console.log(event.keyCode);
        switch(event.keyCode) {
            case 37: // Left Arrow.
                $('#flex_search').toggle();
                App.handleResize();
                break
            case 38: // Up Arrow.
                $('#flex_search').show();
                $('#flex_chat').show();
                App.handleResize();
                break
            case 39: // Right Arrow.
                $('#flex_chat').toggle();
                App.handleResize();
                break
            case 40: // Down Arrow.
                $('#flex_search').hide();
                $('#flex_chat').hide();
                App.handleResize();
                break
        }
    }
});