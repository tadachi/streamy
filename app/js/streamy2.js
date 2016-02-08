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
 * Component for twitch channel search.
 */
var SearchBoxForTwitchChannel = React.createClass({

    typingDelay: new TypingDelay(),
    twitch: new TwitchAPI(),

    doSearch: function() {

        var query = this.refs.searchInput.getDOMNode().value; // this is the search text

        var search = function() {
            this.twitch.searchForTwitchChannel(query, function(response) {
                console.log(response);
            });
        }.bind(this);

        this.typingDelay.delayedRun(search);
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

var SearchBoxForTwitchGame = React.createClass({

    typingDelay: new TypingDelay(),
    twitch: new TwitchAPI(),

    doSearch: function() {

        var query = this.refs.searchInput.getDOMNode().value; // this is the search text

        var search = function() {
            this.twitch.searchForGame(query, function(response) {
                console.log(response);
            });
        }.bind(this);

        this.typingDelay.delayedRun(search);
    },

    render: function() {
        return (
            <input type="text"
            ref="searchInput"
            placeholder="Search for game on Twitch"
            value={this.props.query}
            onChange={this.doSearch}
            />
        );
    }
});

React.render(
    <SearchBoxForTwitchChannel />,
    document.getElementById('search_channel')
);

React.render(
    <SearchBoxForTwitchGame />,
    document.getElementById('search_game')
);
