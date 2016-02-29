Promise.config({
    // Enable warnings.
    warnings: false,
    // Enable long stack traces.
    longStackTraces: false,
    // Enable cancellation.
    cancellation: true
});

function handleAuth(access_token, scope) {
    sessionStorage.setItem('twitch_access_token', access_token);
    sessionStorage.setItem('twitch_scope', scope);
}

// Main
// Handles implicit authentication to Twitch and its oAuth tokens.
if (Util.getQueryStringParams('closewindow')) { // Check querystring for closewindow=true
    window.opener.handleAuth(Util.getQueryStringParams('access_token'), Util.getQueryStringParams('scope'));
    window.close();
}

if (sessionStorage.getItem('twitch_access_token')) {
    console.log(sessionStorage.getItem('twitch_access_token'));
    if (sessionStorage.getItem('twitch_scope')) {
        console.log(sessionStorage.getItem('twitch_scope'));
    }
}

// React
React.render(
    <SearchBoxForTwitchStreams />,
    document.getElementById('twitch_search_stream')
);
