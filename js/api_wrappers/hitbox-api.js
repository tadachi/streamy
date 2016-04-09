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
}

module.exports = HitboxAPI;