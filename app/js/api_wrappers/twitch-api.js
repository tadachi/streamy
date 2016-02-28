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

    searchForStream(stream, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/streams?limit=100&q={stream}'.format({ stream: stream}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {

                if (response.error) {
                    console.log(response);
                    callback(null);
                } else {
                    callback(response); // Server response. Returns 503 if error.
                }

            }
        });

    }

    searchForChannel(channel, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/channels?limit=50&q={channel}'.format({ channel: channel}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {

                if (response.error) {
                    console.log(response);
                    callback(null);
                } else {
                    callback(response); // Server response. Returns 503 if error.
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
                    callback(response); // Server response. Returns 503 if error.
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
                    console.log(response);
                    callback(null);
                } else {
                    callback(response); // Server response. Returns 503 if error.
                }

            }
        });

    }

    authenticate() {
        var url = 'https://api.twitch.tv/kraken/oauth2/authorize' +
            '?response_type=token' +
            '&client_id={client_id}'.format({client_id: 'f55txr3qf7w1bxsjqszl1u2fqmlbk4l'}) +
            '&redirect_uri=_blank' +
            '&scope=channel_read' +
            '&force_verify=true';
        // console.log(url);
        // window.location.href = url;
        popUp(url);

        function popUp(url) {
        	var new_window = window.open(url,'name','height=423,width=370'); // Nice height and width.
        	if (window.focus) {
                new_window.focus();
            }
        	return false;
        }

    }

    parseParms(str) {
        var pieces = str.substring(1).split("&");
        var data = {};
        var i;
        var parts;

        // process each query pair
        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }
            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
        return data;
    }

    getAuthToken() {
        if (document.location.hash) {
            // {access_token: "g495a9lmgjsp3evojrdsa5ia19qcmq", scope: "channel_read"}
            var hash = this.parseParms(document.location.hash);

            return '{access_token}&scope={scope}'.format({access_token: hash.access_token, scope: hash.scope});
        }

        return null;
    }

}
