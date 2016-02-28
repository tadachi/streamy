Promise.config({
    // Enable warnings.
    warnings: false,
    // Enable long stack traces.
    longStackTraces: false,
    // Enable cancellation.
    cancellation: true
});

// var player = new CustomTwitchVideoPlayer('twitch_player');

// setTimeout(function(){
//     player.setChannel('webster141');
// }, 10000);

React.render(
    <TwitchLoginButton />,
    document.getElementById('twitch_login_button')
);

React.render(
    <SearchBoxForTwitchStreams />,
    document.getElementById('twitch_search_channel')
);

React.render(
    <SearchBoxForTwitchGames />,
    document.getElementById('twitch_search_game')
);

// twitch_api = new TwitchAPI();
// twitch_api.authenticate();

// if (twitch_api.getAuthToken()) {
//     console.log(twitch_api.getAuthToken());
// } else {
//     console.log(twitch_api.getAuthToken());
// }
