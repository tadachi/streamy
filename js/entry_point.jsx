var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var GLOBALS = require('./GLOBALS.js');
var Util = require('./lib/util.js');
var TwitchAPI = require('./api_wrappers/twitch-api.js');
var HitboxAPI = require('./api_wrappers/hitbox-api.js');

// Components
var MainTwitchComponent = require('./components/MainTwitchComponent.jsx');
var TwitchVideoPlayer = require('./components/TwitchVideoPlayer.jsx');
var CustomTwitchPlayer = require('./components/CustomTwitchPlayer.js');
var TwitchChat = require('./components/TwitchChat.jsx')

var TwitchChatComponent;
var MainTwitchComponent;
var TwitchVideoPlayerComponent;
var twitch = new TwitchAPI();
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
    TwitchVideoPlayerComponent = new CustomTwitchPlayer('twitch_player'); // Set the div to 'twitch_player'
    // TwitchVideoPlayerComponent = ReactDOM.render(
    //     <TwitchVideoPlayer div_id='player' />,
    //     document.getElementById('twitch_player')
    // );

    TwitchChatComponent = ReactDOM.render(
        <TwitchChat parent_div_id='twitch_chat' div_id='chat'/>,
        document.getElementById('twitch_chat')
    );

    MainTwitchComponent = ReactDOM.render(
        <MainTwitchComponent
            search_div='flex_search'
            chat_div='flex_chat'
            player_div='flex_player'
            TwitchChat={TwitchChatComponent}
            TwitchPlayer={TwitchVideoPlayerComponent}
            />,
        document.getElementById('twitch_search_stream')
    );

};

// $(document).keydown(function(event) {
document.addEventListener('keydown', function(event) {
    if (MainTwitchComponent) {
        // console.log(event.keyCode);
        switch(event.keyCode) {
            case 37: // Left Arrow.
                $('#flex_search').toggle();
                MainTwitchComponent.handleResize();
                break
            case 38: // Up Arrow.
                $('#flex_search').show();
                $('#flex_chat').show();
                MainTwitchComponent.handleResize();
                break
            case 39: // Right Arrow.
                $('#flex_chat').toggle();
                MainTwitchComponent.handleResize();
                break
            case 40: // Down Arrow.
                $('#flex_search').hide();
                $('#flex_chat').hide();
                MainTwitchComponent.handleResize();
                break
        }
    }
});