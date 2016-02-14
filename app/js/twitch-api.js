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
        var takbytes_JSON_URLs = {
            speedruns: 'https://api.takbytes.com/speedruns',
            starcraft: 'https://api.takbytes.com/starcraft',
            hearthstone: 'https://api.takbytes.com/hearthstone',
            dota: 'https://api.takbytes.com/dota',
            counterstrike: 'https://api.takbytes.com/counterstrike',
            hitbox: 'https://api.takbytes.com/hitbox',
            league: 'https://api.takbytes.com/league',
            heroes: 'https://api.takbytes.com/heroes',
            diablo: 'https://api.takbytes.com/diablo'
        };


        this.categories = ['Speedruns', 'Starcraft', 'Hitbox', 'Hearthstone', 'Dota', 'Counterstrike', 'LeagueOfLegends', 'Heroes', 'Diablo', 'Followed'];
    }

    getJSON(url, callback) {
        $.ajax({
            url: url,
            dataType: 'json', // tell jQuery we're expecting JSON.

            success: function(data) {
                callback(data);
            }
        });
    }

    /*
     * Returns a xhr object for a request.
     */
    searchForChannel(channel, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/channels?q={channel}'.format({ channel: channel}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {
                callback(response); // Server response. Returns 503 if error.
            }
        });

    }

    searchForGame(game, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/games?q={game}&type=suggest&live=true'.format({ game: game}),
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',

            success: function(response) {
                callback(response); // Server response. Returns 503 if error.
            }
        });
    }

    toString() {
        for (json_url of takbytes_JSON_URLs.values()) {
            getJSON(json_url, function(data) {
                console.log(data);
            });
        }
    }
}
