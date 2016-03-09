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
            data: '',
            showFollowButton: 'none',
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
            query = this.refs.searchInput.value; // this is the search data
        }
        this.setState({ data: ''});
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
        reloadTwitchChat(this.props.twitch_chat_div, 300, (window.innerHeight-MAGIC_MARGIN), channel);
        this.props.player.setChannel(channel);
    },

    selectCategoryHandle: function() {
        let value = this.refs.selectInput.value;
        switch(value) {
            case 'TOPGAMES':
                break;
            case 'FOLLOWED':
                this.twitch.getFollowedStreams(function(data) {
                    this.setState({ data: data });
                }.bind(this));
                break;
            case 'SPEEDRUNS':
                this.twitch.getSpeedrunStreams(function(data) {
                    this.setState({ data: data });
                }.bind(this));
                break;
        }
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
    },

    render: function() {

        // Inline CSS.

        var search = {
            display: 'block',
            maxWidth: '300px',
            height: (this.state.window_inner_height-MAGIC_MARGIN) + 'px',
            maxHeight: (this.state.window_inner_height-MAGIC_MARGIN) + 'px',
            overflowX: 'hidden',
            overflowY: 'scroll',

            // scroll bar style

        };

        var flex_div = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',

            width: 'inherit',
            padding: '5px',
        };

        var login = {
            width: '147px',
            margin: '5px',
        };

        var input = {
            width: '140px',
            height: '20px',
            margin: '5px',
        };

        var select = {
            width: '100px',
            margin: '5px',
        };

        var followButton = {
            margin: '5px',
        };

        var list_view = {
            maxWidth: '300px',
            height: (this.state.window_inner_height-MAGIC_MARGIN) + 'px',
            maxHeight: (this.state.window_inner_height-MAGIC_MARGIN) + 'px',
        };

        return (
            <div id='search' style={search}>
                <div style={flex_div}>
                    <TwitchLoginButton style={login} />

                    <input
                    style={input}
                    type="text"
                    ref='searchInput'
                    placeholder='Search..'
                    value={this.props.query}
                    onChange={this.doSearch}
                    />

                    <select style={select} ref='selectInput' onChange={this.selectCategoryHandle}>
                            <option value='SEARCH'>Top Games</option>
                            <option value='TOPGAMES'>Top Games</option>
                            <option value='SPEEDRUNS'>Speedruns</option>
                            <option value='FOLLOWED'>Followed</option>
                    </select>
                </div>

                <SelectorForTwitchGames search={this.search} />
                <ListViewTwitchStreams style={list_view} setChannel={this.setChannel}  data={this.state.data} />
            </div>
        );
    }
});
