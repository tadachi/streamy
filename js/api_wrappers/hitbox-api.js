var GLOBALS = require('../GLOBALS.js');
var $ = require('jquery');

//https://hboxapi.herokuapp.com/
/**
 * Hitbox API wrapper class comprised of callbacks to get data in a JSON representation.
 */
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
                    let hitbox = {hitbox: response};
                    callback(hitbox);
                }

            }
        });

    }
}

module.exports = HitboxAPI;