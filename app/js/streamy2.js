Promise.config({
    // Enable warnings.
    warnings: false,
    // Enable long stack traces.
    longStackTraces: false,
    // Enable cancellation.
    cancellation: true
});

React.render(
    <CustomVideoPlayer />,
    document.getElementById('twitch_video_player')
);

// React.render(
//     <TwitchLoginButton />,
//     document.getElementById('twitch_login_button')
// );
//
// React.render(
//     <SearchBoxForTwitchStreams />,
//     document.getElementById('search_channel')
// );
//
// React.render(
//     <SearchBoxForTwitchGames />,
//     document.getElementById('search_game')
// );

twitch_api = new TwitchAPI();
// twitch_api.authenticate();

// if (twitch_api.getAuthToken()) {
//     console.log(twitch_api.getAuthToken());
// } else {
//     console.log(twitch_api.getAuthToken());
// }
