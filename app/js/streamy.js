var TwitchStream = React.createClass({
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
    }
});

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
    }
});

/*
 * Component for twitch search.
 */
var SearchTwitchBox = React.createClass({
    doSearch: function() {
        var query = this.refs.searchInput.getDOMNode().value; // this is the search text
        var twitch = new TwitchAPI();
        twitch.searchTwitch(query, function(response) {
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

React.render(
    <SearchTwitchBox />,
    document.getElementById('search'),
    function() {
        console.log('test');
        $('#search').typeWatch(
            {
                callback: function (value) { alert('TypeWatch callback: (' + this.type + ') ' + value); },
                wait: 750,
                highlight: true,
                captureLength: 2
            }
        );
});


// React.render(
//         <TwitchChat
//             id='x'
//             streamer={'http://twitch.tv/chat/embed?channel={ch}&amp;popout_chat=true'.format({ch: 'theclaude'})}
//             height='500'
//             width='350'
//         />,
//         document.getElementById('chat_1')
// );

// $('#x').load(function(){
//     alert('loaded!');
// });
