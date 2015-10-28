'use strict';

var TwitchStream = React.createClass({
    displayName: 'TwitchStream',

    propTypes: {
        id: React.PropTypes.string.isRequired,
        streamer: React.PropTypes.string.isRequired,
        height: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired
    },
    render: function render() {
        return React.createElement('iframe', {
            id: this.props.id,
            scrolling: 'yes',
            src: this.props.streamer,
            height: this.props.height,
            width: this.props.width
        });
    }
});

var TwitchChat = React.createClass({
    displayName: 'TwitchChat',

    propTypes: {
        id: React.PropTypes.string.isRequired,
        streamer: React.PropTypes.string.isRequired,
        height: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired
    },
    render: function render() {
        return React.createElement('iframe', {
            id: this.props.id,
            scrolling: 'yes',
            src: this.props.streamer,
            height: this.props.height,
            width: this.props.width
        });
    }
});

/*
 * Component for twitch search.
 */
var SearchTwitchBox = React.createClass({
    displayName: 'SearchTwitchBox',

    doSearch: function doSearch() {
        var query = this.refs.searchInput.getDOMNode().value; // this is the search text
        var twitch = new TwitchAPI();
        twitch.searchTwitch(query, function (response) {
            console.log(response);
        });
    },
    render: function render() {
        return React.createElement('input', { type: 'text',
            ref: 'searchInput',
            placeholder: 'Search Twitch User Name',
            value: this.props.query,
            onChange: this.doSearch
        });
    }
});

React.render(React.createElement(SearchTwitchBox, null), document.getElementById('search'), function () {
    console.log('test');
    $('#search').typeWatch({
        callback: function callback(value) {
            alert('TypeWatch callback: (' + this.type + ') ' + value);
        },
        wait: 750,
        highlight: true,
        captureLength: 2
    });
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
