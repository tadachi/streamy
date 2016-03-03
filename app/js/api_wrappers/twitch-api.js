// var takbytes_JSON_URLs = {
//     speedruns: 'https://api.takbytes.com/speedruns',
//     starcraft: 'https://api.takbytes.com/starcraft',
//     hearthstone: 'https://api.takbytes.com/hearthstone',
//     dota: 'https://api.takbytes.com/dota',
//     counterstrike: 'https://api.takbytes.com/counterstrike',
//     hitbox: 'https://api.takbytes.com/hitbox',
//     league: 'https://api.takbytes.com/league',
//     heroes: 'https://api.takbytes.com/heroes',
//     diablo: 'https://api.takbytes.com/diablo'
//     // followed: 'https://api.twitch.tv/kraken/streams/followed?oauth_token={oauth_token}'.format({ oauth_token: twitchAccessToken})
// };

class TwitchAPI {

    constructor() {
    }

    // Returns people playing a game based on query.
    searchForStream(stream, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/streams?limit=100&q={stream}'.format({ stream: stream}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {

                if (response.error) {
                    // console.log(response);
                    callback(null);
                } else {
                    callback(response);
                }

            }
        });

    }

    // Returns a live channel matching the query.
    searchForChannel(channel, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/channels?limit=50&q={channel}'.format({ channel: channel}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {

                if (response.error) {
                    // console.log(response);
                    callback(null);
                } else {
                    callback(response);
                }

            }
        });

    }

    searchForGame(game, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/games?limit=50&q={game}&type=suggest&live=true'.format({ game: game}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {

                if (response.error) {
                    console.log(response);
                    callback(null);
                } else {
                    callback(response);
                }

            }
        });
    }

    searchTopStreamedGames(limit = 100, offset = 0, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/games/top?limit={limit}&offset={offset}'.format({limit: limit, offset: offset}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {

                if (response.error) {
                    // console.log(response);
                    callback(null);
                } else {
                    callback(response);
                }

            }
        });

    }

    getFollowedStreams(callback) {
        //https://api.twitch.tv/kraken/streams/followed?oauth_token=

        $.ajax({
            url: 'https://api.twitch.tv/kraken/streams/followed?oauth_token={oauth_token}'.format({ oauth_token: this.getAuthToken()}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {

                if (response.error) {
                    // console.log(response);
                    callback(null);
                } else {
                    callback(response);
                }

            }
        });

    }

    authenticate() {
        var url = 'https://api.twitch.tv/kraken/oauth2/authorize' +
            '?response_type=token' +
            '&client_id={client_id}'.format({client_id: 'f55txr3qf7w1bxsjqszl1u2fqmlbk4l'}) +
            '&redirect_uri=http://beastmachine:4000/?closewindow=true' +
            '&scope=user_read' +
            '&force_verify=true';

        popUp(url);

        function popUp(url) {
        	var new_window = window.open(url,'name','height=423,width=370'); // Nice height and width.
        	if (window.focus) {
                new_window.focus();
            }
        	return false;
        }

    }

    getAuthToken() {
        var access_token = sessionStorage.getItem('twitch_access_token');
        var scope = sessionStorage.getItem('twitch_scope');

        if (access_token)
            return '{access_token}&scope={scope}'.format({access_token: access_token, scope: scope});

        return null;
    }

}
