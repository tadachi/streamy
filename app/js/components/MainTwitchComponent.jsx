/*
 * Component for twitch channel search.
 */
let MAGIC_MARGIN = 15;

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
            window_inner_width: window.innerWidth,
            window_inner_height: window.innerHeight,
            search_twitch_width:  $('#flex_search').width(),
            search_twitch_height:  $('#flex_search').height() - MAGIC_MARGIN,
            player_width:  $('#flex_player').width(),
            player_height: $('#flex_player').height() - MAGIC_MARGIN,
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

    handleResize: function(e) {
        this.setState({ window_inner_width: window.innerWidth});
        this.setState({ window_inner_height: window.innerHeight});
        this.setState({ search_twitch_width: $('#flex_search').width() });
        this.setState({ search_twitch_height: window.innerHeight - MAGIC_MARGIN });
        this.setState({ player_width: $('#flex_player').width() });
        this.setState({ player_height: window.innerHeight - MAGIC_MARGIN });

        $('#flex_search').css('height', this.state.search_twitch_height);
        $('#flex_player').css('width', this.state.player_width);
        $('#flex_player').css('height', this.state.player_height);
        $('#twitch_player').find('iframe').css('width', this.state.player_width);
        $('#twitch_player').find('iframe').css('height', this.state.player_height);

        // console.log('handleResize:');
        // console.log('window w ' + window.innerWidth);
        // console.log('window h ' + window.innerHeight);
        // console.log('search w ' + $('#flex_search').width());
        // console.log('search h ' + $('#flex_search').height());
        // console.log('player w ' + $('#flex_player').width());
        // console.log('player h ' + $('#flex_player').height());
    },

    componentDidMount: function() {

        $('#twitch_player').find('iframe').css('width', $('#flex_player').width());
        $('#twitch_player').find('iframe').css('height', this.state.window_inner_height - MAGIC_MARGIN);

        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    componentDidUpdate: function() {
        // console.log('componentDidUpdate:');
        // console.log('window w ' + window.innerWidth);
        // console.log('window h ' + window.innerHeight);
        // console.log('search w ' + $('#flex_search').width());
        // console.log('search h ' + $('#flex_search').height());
        // console.log('player w ' + $('#flex_player').width());
        // console.log('player h ' + $('#flex_player').height());
    },

    render: function() {

        // Inline CSS.
        var login = {
            display: 'block',
        };

        var input = {
            display: 'block',
            width: '200px',
        };

        var state = {
            display: 'block',
        };

        var search = {
            display: 'block',
            maxWidth: '300px',
            height: (this.state.window_inner_height-15) + 'px',
            maxHeight: (this.state.window_inner_height-15) + 'px',
            overflowX: 'hidden',
            overflowY: 'scroll',
        };

        var button = {
            display: 'block',
        };

        var list_view = {
            maxWidth: '300px',
            height: (this.state.window_inner_height-15) + 'px',
            maxHeight: (this.state.window_inner_height-15) + 'px',
        };

        // var fat = {
        //     fontSize: '14px',
        //     width: '250px',
        //     maxHeight: $(window).height() + 'px',
        //     backgroundColor: 'white',
        //     overflowY: 'scroll',
        // }
        //
        // liArray = [];
        //
        // for ( var i = 0; i < 100; i++) {
        //     liArray.push(<li key={i}>{i}</li>);
        // }
        //
        // <div style={fat}>
        //     <ul>
        //         {liArray}
        //     </ul>
        // </div>

        return (
            <div style={search}>
                <TwitchLoginButton style={login} />
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
                <ListViewTwitchStreams style={list_view} setChannel={this.setChannel}  data={this.state.data} />
                {/*<SelectorForTwitchGames />*/}
            </div>
        );
    }
});
