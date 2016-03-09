``


// Main.
var customTwitchPlayer;
var MainTwitchComponentElement;
var MainTwitchComponent;

function saveAuthToSession(access_token, scope) {
    sessionStorage.setItem('twitch_access_token', access_token);
    sessionStorage.setItem('twitch_scope', scope);
}

// Handles implicit authentication to Twitch and its oAuth tokens.
if (Util.getQueryStringParams('closewindow')) { // Check querystring for closewindow=true
    window.opener.saveAuthToSession(Util.getQueryStringParams('access_token'), Util.getQueryStringParams('scope'));
    window.close();
}
// detected that it's not a new window getting twitch oauth token so remove the preview parlor trick and show the actual app.
else {

    // Hide the player until user selects a stream to watch.
    $('#flex_chat').hide();

    // Remove the preview class and show the rest of the app.
    // $('body').removeClass('preview-background');
    $('#flex_container').addClass('flex-container')
    $('#flex_search').addClass('flex-search');
    $('#flex_player').addClass('flex-player');
    $('#flex_chat').addClass('flex-chat');

    // React
    customTwitchPlayer = new CustomTwitchPlayer('twitch_player'); // Set the div to 'twitch_player'

    MainTwitchComponentElement = <MainTwitchComponent parentDiv='flex_search' twitch_chat_div='twitch_chat' player={customTwitchPlayer} />

    MainTwitchComponent =  ReactDOM.render(
        MainTwitchComponentElement,
        document.getElementById('twitch_search_stream')
    );


}

$(document).keydown(function(event) {
    if (MainTwitchComponent) {
        console.log(event.keyCode);
        switch(event.keyCode) {
            case 37:
                $('#flex_search').toggle();
                MainTwitchComponent.handleResize();
                break
            case 38:
                break
            case 39:
                $('#flex_chat').toggle();
                MainTwitchComponent.handleResize();
                break
            case 40:
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
