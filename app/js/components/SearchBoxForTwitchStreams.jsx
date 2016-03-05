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

    setChannel: function(channel) {
        $('#' + this.props.player.div_id).show();
        this.props.player.setChannel(channel);
    },

    toggleVideoPlayer: function() {
        $('#' + this.props.player.div_id).toggle();
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
        this.props.player.toString();
    },

    handleScroll(scrollData){
        console.log(scrollData);
    },

    componentDidMount: function() {
        this.search('360Chrism');
    },

    render: function() {

        // Inline CSS.
        var login = {
            display: 'block',
        };

        var input = {
            display: 'block',
            width: '200px'
        };

        var state = {
            display: 'block'
        };

        var list_view = {
            display: 'block'
        };

        var button = {
            display: 'block'
        };

        var scrollBarStyles = {
            borderRadius: 5
        };

        var fat = {
            fontSize: '14px',
            width: '350px',
            backgroundColor: 'white',
        }

        liArray = [];

        for ( var i = 0; i < 100; i++) {
            liArray.push(<li key={i}>{i}</li>);
        }

        return (
            <ScrollArea
                speed={0.8}
                horizontal={false}
                onScroll={this.handleScroll}
                >
                <div style={fat}>
                    <ul>
                        {liArray}
                    </ul>
                </div>
            </ScrollArea>
        );
    }
});
{/*<TwitchLoginButton style={login}/>
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
<button style={button} onClick={this.toggleVideoPlayer}>toggleVideoPlayer</button>
<ListViewTwitchStreams setChannel={this.setChannel} style={list_view} data={this.state.data} />*/}
{/*<SelectorForTwitchGames />*/}
