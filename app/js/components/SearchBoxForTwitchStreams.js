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

    buttonHandle: function(e) {
        sessionStorage.clear();
        console.log('session cleared');
    },

    debugHandle2: function(e) {
        console.log(this.twitch.getAuthToken());
    },

    componentDidMount: function() {
    },

    render: function() {

        // Inline CSS.
        var input = {
            width: '200px'
        };

        return (
                <div>
                    <SelectorForTwitchGames />
                    <input
                    style={input}
                    type="text"
                    ref="searchInput"
                    placeholder="Search.."
                    value={this.props.query}
                    onChange={this.doSearch}
                    />
                    <b>{this.state.state}</b>
                    <TwitchLoginButton />
                    <button onClick={this.buttonHandle}>Clear Session</button>
                    <button onClick={this.debugHandle2}>Debug</button>
                    <ListViewTwitchStreams data={this.state.data} />
                </div>

        );
    }
});
