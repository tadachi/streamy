/*
 * Component for twitch channel search.
 */
var SearchBoxForTwitchStreams = React.createClass({

    twitch: new TwitchAPI(),
    typingDelay: new TypingDelay(),

    Status: {
        PENDING: '...',
        SEARCHING: 'searching...',
    },

    getInitialState: function() {
        return {
            state: '...',
            data: '',
        };
    },

    search: function(query = null) {
        if (!query) {
            query = this.refs.searchInput.getDOMNode().value; // this is the search data
        }

        this.twitch.searchForStream(query, function(data) {
            this.setState({ state: this.Status.PENDING});
            this.setState({ data: data });
        }.bind(this));
    },

    doSearch: function() {
        this.setState({state: this.Status.SEARCHING});
        this.typingDelay.delayedRun(this.search);
    },

    followsHandle: function() {
        this.twitch.getFollowedStreams(function(data) {
            this.setState({ data: data });
        }.bind(this));
    },

    debugHandle1: function(e) {
        sessionStorage.clear();
        console.log('session cleared');
    },

    debugHandle2: function(e) {
        console.log(this.twitch.getAuthToken());
    },

    componentDidMount: function() {
        this.search('360Chrism');
    },

    render: function() {

        // Inline CSS.
        var login = {
            display: 'block',
        }

        var input = {
            display: 'block',
            width: '200px'
        }

        var state = {
            display: 'block'
        }

        var list_view = {
            display: 'block'
        }

        var button = {
            display: 'block'
        }

        return (
                <div>
                    <TwitchLoginButton style={login}/>
                    <input
                    style={input}
                    type="text"
                    ref="searchInput"
                    placeholder="Search.."
                    value={this.props.query}
                    onChange={this.doSearch}
                    />
                    <b style={state}>{this.state.state}</b>
                    <button style={button} onClick={this.followsHandle}>Get Followed</button>
                    <button style={button} onClick={this.debugHandle1}>Clear Session</button>
                    <button style={button} onClick={this.debugHandle2}>Debug</button>
                    <ListViewTwitchStreams style={list_view} data={this.state.data} />
                    {/*<SelectorForTwitchGames />*/}
                </div>

        );
    }
});
