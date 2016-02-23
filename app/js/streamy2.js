Promise.config({
    // Enable warnings.
    warnings: false,
    // Enable long stack traces.
    longStackTraces: false,
    // Enable cancellation.
    cancellation: true
});

React.render(
    <SearchBoxForTwitchStreams />,
    document.getElementById('search_channel')
);

React.render(
    <SearchBoxForTwitchGames />,
    document.getElementById('search_game')
);

// twitch_api = new TwitchAPI();
// twitch_api.authenticate();

if (document.location.hash) {
    console.log(document.location.hash);
} else {
    console.log('Not authenticated to Twitch.');
}
