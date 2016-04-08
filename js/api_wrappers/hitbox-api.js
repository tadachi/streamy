var GLOBALS = require('../GLOBALS.js');
var $ = require('jquery');

//https://hboxapi.herokuapp.com/
class HitboxAPI {
    constructor() {}
    
    getTopStreams(callback) {

        $.ajax({
            url: 'https://hboxapi.herokuapp.com/',
            // The name of the callback parameter, as specified by the YQL service.
            jsonp: 'callback',
            // Tell jQuery we're expecting JSONP.
            dataType: 'jsonp',
            
            data: {
                format: "json"
            },

            success: function(response) {
                
                if (response.error) {
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
}

module.exports = HitboxAPI;