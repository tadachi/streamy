var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var GLOBALS = require('./GLOBALS.js');
var Util = require('./lib/util.js');

// Components
var MainTwitchComponent = require('./components/MainTwitchComponent.jsx');
var TwitchVideoPlayer = require('./components/TwitchVideoPlayer.jsx');
var CustomTwitchPlayer = require('./components/CustomTwitchPlayer.js');
var TwitchChat = require('./components/TwitchChat.jsx')

var TwitchChatComponent;
var MainTwitchComponent;
var TwitchVideoPlayerComponent;

/*
 * Main
 */

// Handles implicit authentication to Twitch and its oAuth tokens.
if (Util.getQueryStringParams('closewindow')) { // Check querystring for closewindow=true
    window.opener.sessionStorage.setItem('twitch_access_token', Util.getQueryStringParams('access_token'));
    window.opener.sessionStorage.setItem('twitch_scope', Util.getQueryStringParams('scope'));
    window.close();
}
// detected that it's not a new window getting twitch oauth token so remove the preview parlor trick and show the actual app.
else {
    // Hide the player until user selects a stream to watch.
    // $('#flex_search').hide();
    // $('#flex_chat').hide();

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
        <TwitchChat parent_div_id='twitch_chat' />,
        document.getElementById('twitch_chat')
    );

    /*TwitchPlayer={TwitchVideoPlayerComponent}*/
    MainTwitchComponent = ReactDOM.render(
        <MainTwitchComponent
            parentDiv='flex_search'
            twitch_chat_div='flex_chat'
            player_div_id='player'
            chat_div_id='chat'
            TwitchChat={TwitchChatComponent}
            TwitchPlayer={TwitchVideoPlayerComponent}
            />,
        document.getElementById('twitch_search_stream')
    );

};

$(document).keydown(function(event) {
    if (MainTwitchComponent) {
        // console.log(event.keyCode);
        switch(event.keyCode) {
            case 37:
                $('#flex_search').toggle();
                MainTwitchComponent.handleResize();
                break
            case 38:
                $('#flex_search').show();
                $('#flex_chat').show();
                MainTwitchComponent.handleResize();
                break
            case 39:
                $('#flex_chat').toggle();
                MainTwitchComponent.handleResize();
                break
            case 40:
                $('#flex_search').hide();
                $('#flex_chat').hide();
                MainTwitchComponent.handleResize();
                break
        }
    }

});

// Debug
// if (sessionStorage.getItem('twitch_access_token')) {
//     console.log(sessionStorage.getItem('twitch_access_token'));
//     if (sessionStorage.getItem('twitch_scope')) {
//         console.log(sessionStorage.getItem('twitch_scope'));
//     }
// }
