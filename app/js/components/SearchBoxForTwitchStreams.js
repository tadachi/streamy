/*
 * Component for twitch channel search.
 */
var SearchBoxForTwitchStreams = React.createClass({

    twitch: new TwitchAPI(),
    typingDelay: new TypingDelay(),

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
            this.setState({ state: '...'});
            this.setState({ data: data });
        }.bind(this));
    },

    doSearch: function() {
        this.setState({state: 'searching...'});
        this.typingDelay.delayedRun(this.search);
    },

    debugHandle1: function(e) {
        sessionStorage.clear();
        console.log('session cleared');
    },

    debugHandle2: function(e) {
        console.log(this.twitch.getAuthToken());
    },

    componentDidMount: function() {
        this.search('ESL_SC2');
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
                    <button onClick={this.debugHandle1}>Clear Session</button>
                    <button onClick={this.debugHandle2}>Debug</button>
                    <ListViewTwitchStreams style={list_view} data={this.state.data} />
                    {/*<SelectorForTwitchGames />*/}
                </div>

        );
    }
});
