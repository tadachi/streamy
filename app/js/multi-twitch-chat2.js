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

// React.render(
//     <h1>Hello, world!!!</h1>,
//     document.getElementById('example')
// );

var streamername = 'bowiethehero';
var chatsrc = 'http://twitch.tv/chat/embed?channel={ch}&amp;popout_chat=true'.format({ch: streamername});

// var chat =    [ '<iframe ',
//         'id=\'_{name}\' '.format({ name: stream.streamname}),
//         'frameborder=\'0\' ',
//         'scrolling=\'yes\' ',
//         'src=\'{url}\' '.format({url: chatsrc}),
//         'width=\'{w}\' '.format({w: width-40}),
//         'height=\'{h}\' '.format({h: height-40}),
//         '> ',
//     '</iframe>'].join('');


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

var TwitchSearchBox = React.createClass({
    doSearch: function() {
        var query = this.refs.searchInput.getDOMNode().value; // this is the search text
        TwitchSearch(query, function(response) {
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

function TwitchSearch(channel, callback) {
    $.ajax({
        url: 'https://api.twitch.tv/kraken/search/channels?q={channel}'.format({ channel: channel}),
        // The name of the callback parameter, as specified by the YQL service.
        jsonp: "callback",
        // Tell jQuery we're expecting JSONP.
        dataType: "jsonp",

        success: function( response ) {
            callback(response); // Server response.
        }
    });
}

React.render(
        <TwitchSearchBox />,
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
