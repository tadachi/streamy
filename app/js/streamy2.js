function saveAuthToSession(access_token, scope) {
    sessionStorage.setItem('twitch_access_token', access_token);
    sessionStorage.setItem('twitch_scope', scope);
}

// Main
// Handles implicit authentication to Twitch and its oAuth tokens.
if (Util.getQueryStringParams('closewindow')) { // Check querystring for closewindow=true
    window.opener.saveAuthToSession(Util.getQueryStringParams('access_token'), Util.getQueryStringParams('scope'));
    window.close();
}
// detected that it's not a new window getting twitch oauth token so set the flexbox css classes in index.html
else {
    $('body').addClass('flex-body').removeClass('preview-background');
    $('#twitch_search_stream').addClass('flex-search')
    $('#twitch_player').addClass('flex-player')
}

// Debug
// if (sessionStorage.getItem('twitch_access_token')) {
//     console.log(sessionStorage.getItem('twitch_access_token'));
//     if (sessionStorage.getItem('twitch_scope')) {
//         console.log(sessionStorage.getItem('twitch_scope'));
//     }
// }

// React
var customTwitchPlayer = new CustomTwitchPlayer('twitch_player');
// customTwitchPlayer.pause();

ReactDOM.render(
    <SearchBoxForTwitchStreams />,
    document.getElementById('twitch_search_stream')
);
