

// Main.
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
    $('#twitch_player').hide();

    var customTwitchPlayer = new CustomTwitchPlayer('twitch_player'); // Set the div to 'twitch_player'

    // Remove the preview class and show the rest of the app.
    $('body').addClass('flex-body').removeClass('preview-background');
    $('#twitch_search_stream').addClass('flex-search')
    $('#twitch_player').addClass('flex-player')

    // React.
    ReactDOM.render(
        <SearchBoxForTwitchStreams player={customTwitchPlayer} />,
        document.getElementById('twitch_search_stream')
    );
}

// Debug
// if (sessionStorage.getItem('twitch_access_token')) {
//     console.log(sessionStorage.getItem('twitch_access_token'));
//     if (sessionStorage.getItem('twitch_scope')) {
//         console.log(sessionStorage.getItem('twitch_scope'));
//     }
// }
