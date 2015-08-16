/* Similar to what you find in Java's format. */
/* Usage: chatsrc = 'http://twitch.tv/chat/embed?channel={channel}&amp;popout_chat=true'.format({ channel: streamer}); */
if (!String.prototype.format) {
    String.prototype.format = function() {
        var str = this.toString();

        if (!arguments.length) {
            return str;
        }

        var args = typeof(arguments[0]);
        args = ('string' == args || 'number' == args) ? arguments : arguments[0];

        for (var arg in args) {
            str = str.replace(RegExp('\\{' + arg + '\\}', 'gi'), args[arg]);
        }

        return str;
    };
}


// var json_urls = {
//     speedruns: "https://api.takbytes.com/speedruns",
//     starcraft: "https://api.takbytes.com/starcraft",
//     hearthstone: "https://api.takbytes.com/hearthstone",
//     dota: "https://api.takbytes.com/dota",
//     counterstrike: "https://api.takbytes.com/counterstrike",
//     hitbox: "https://api.takbytes.com/hitbox",
//     league: "https://api.takbytes.com/league",
//     heroes: "https://api.takbytes.com/heroes",
//     diablo: "https://api.takbytes.com/diablo"
//     // followed: "https://api.twitch.tv/kraken/streams/followed?oauth_token={oauth_token}".format({ oauth_token: twitchAccessToken})
// };

var json_urls = new Map();
json_urls.set('speedruns', "https://api.takbytes.com/speedruns")
json_urls.set('starcraft', "https://api.takbytes.com/starcraft")
json_urls.set('hearthstone', "https://api.takbytes.com/hearthstone")
json_urls.set('dota',  "https://api.takbytes.com/dota")
json_urls.set('counterstrike', "https://api.takbytes.com/counterstrike")
json_urls.set('hitbox', "https://api.takbytes.com/hitbox")
json_urls.set('league', "https://api.takbytes.com/league")
json_urls.set('heroes', "https://api.takbytes.com/heroes")
json_urls.set('diablo', "https://api.takbytes.com/diablo")

var categories = ["Speedruns", "Starcraft", "Hitbox", "Hearthstone", "Dota", "Counterstrike", "LeagueOfLegends", "Heroes", "Diablo", "Followed"];

var streamername = 'bowiethehero';
var chatsrc = 'http://twitch.tv/chat/embed?channel={ch}&amp;popout_chat=true'.format({ch: streamername});

var TwitchChat = React.createClass({
    propTypes: {
        id : React.PropTypes.string.isRequired,
        streamer : React.PropTypes.string.isRequired,
        height : React.PropTypes.number.isRequired,
        width : React.PropTypes.number.isRequired,
    },
    render: function() {
        return (
            <iframe
            id={this.props.id}
            scrolling='yes'
            src={this.props.streamer}
            height={this.props.height}
            width={this.props.width}
            >
            </iframe>
        );
    },

});

var searchTwitchBox = React.createClass({
    doSearch: function() {
        var query = this.refs.searchInput.getDOMNode().value; // this is the search text
        searchTwitch(query, function(response) {
            console.log(response);
        });
    },
    render: function() {
        return (
            <input type="text"
            ref="searchInput"
            placeholder="Search Twitch User Name"
            value={this.props.query}
            onChange={this.doSearch}
            />
        );
    }
});

function searchTwitch(channel, callback) {
    $.ajax({
        url: 'https://api.twitch.tv/kraken/search/channels?q={channel}'.format({ channel: channel}),
        // The name of the callback parameter, as specified by the YQL service.
        jsonp: "callback",
        // Tell jQuery we're expecting JSONP.
        dataType: "jsonp",

        success: function(response) {
            callback(response); // Server response.
        }
    });
}

function getStreams(url, callback) {
    $.ajax({
        url: url,
        dataType: "json", // tell jQuery we're expecting JSON.

        success: function(data) {
            callback(data);
        }
    });
}

for (var value of json_urls.values()) {
    getStreams(value, function(data) {
        console.log(data);
    });
}

React.render(
        <searchTwitchBox />,
        document.getElementById('search')
);

// React.render(
//         <TwitchChat
//             id='x'
//             streamer={'http://twitch.tv/chat/embed?channel={ch}&amp;popout_chat=true'.format({ch: 'theclaude'})}
//             height='500'
//             width='350'
//         />,
//         document.getElementById('chat_1')
// );

$('#x').load(function(){
    alert('loaded!');
});
