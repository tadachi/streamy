var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

class TwitchAPI {

    constructor() {}

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
            url: 'https://api.twitch.tv/kraken/search/channels?limit=100&q={channel}'.format({ channel: channel}),
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

    searchForStreamsOfGame(game, callback) {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/streams?game={game}&limit=100'.format({ game: game}),
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

    searchForGame(game, callback) {

        $.ajax({
            url: 'https://api.twitch.tv/kraken/search/games?limit=100&q={game}&type=suggest&live=true&limit=100'.format({ game: game}),
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

    getSpeedrunStreams(callback) {
        $.ajax({
            url: 'http://api.speedrunslive.com/frontend/streams',
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
        // Dev
        let redirect_uri = 'http://beastmachine:4000/?closewindow=true';
        let client_id = 'f55txr3qf7w1bxsjqszl1u2fqmlbk4l';

        // Production
        // let redirect_uri = 'http://www.takbytes.com/streamy/?closewindow=true';
        // let client_id = '6hmvfxikonfu17x6ax3wmc206qtalc8';

        var url = 'https://api.twitch.tv/kraken/oauth2/authorize' +
            '?response_type=token' +
            '&client_id={client_id}'.format({client_id: client_id}) +
            '&redirect_uri={redirect_uri}'.format({redirect_uri: redirect_uri}) +
            '&scope=user_read' +
            '&force_verify=true';

        popUp(url);

        function popUp(url) {
        	var new_window = window.open(url,'name','height=600,width=390'); // Nice height and width.
        	if (window.focus) {
                new_window.focus();
            }
        	return false;
        }

    }

    getUser() {
        $.ajax({
            url: 'https://api.twitch.tv/kraken/user?oauth_token={oauth_token}'.format({ oauth_token: this.getAuthToken()}),
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

    getAuthToken() {
        var access_token = sessionStorage.getItem('twitch_access_token');
        var scope = sessionStorage.getItem('twitch_scope');

        if (access_token)
            return '{access_token}&scope={scope}'.format({access_token: access_token, scope: scope});

        return null;
    }

}

module.exports = TwitchAPI;
