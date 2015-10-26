// var json_urls = {
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

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TwitchAPI = (function () {
    function TwitchAPI() {
        _classCallCheck(this, TwitchAPI);

        var json_urls = {
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

    _createClass(TwitchAPI, [{
        key: 'getJSON',
        value: function getJSON(url, callback) {
            $.ajax({
                url: url,
                dataType: 'json', // tell jQuery we're expecting JSON.

                success: function success(data) {
                    callback(data);
                }
            });
        }

        /*
         * Callback for searching for twitch channels
         */
    }, {
        key: 'searchTwitch',
        value: function searchTwitch(channel, callback) {
            $.ajax({
                url: 'https://api.twitch.tv/kraken/search/channels?q={channel}'.format({ channel: channel }),
                // The name of the callback parameter, as specified by the YQL service.
                jsonp: 'callback',
                // Tell jQuery we're expecting JSONP.
                dataType: 'jsonp',

                success: function success(response) {
                    callback(response); // Server response.
                }
            });
        }
    }, {
        key: 'toString',
        value: function toString() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = json_urls.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    json_url = _step.value;

                    getJSON(json_url, function (data) {
                        console.log(data);
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return TwitchAPI;
})();
