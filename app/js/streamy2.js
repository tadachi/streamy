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

    twitch: new TwitchAPI(),
    typingDelay: new TypingDelay(5000,1),
    doSearch: function() {
        var query = this.refs.searchInput.getDOMNode().value; // this is the search text

        // var test = setTimeout(function(){
        //     console.log('Timeout created.');
        // }, 2000);

        this.typingDelay.delayedRun(function () { console.log('Timeout created.'); });
        // this.twitch.searchTwitch(query, function(response) {
        //    console.log(response);
        // });
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

// $('#x').load(function(){
//     alert('loaded!');
// });
