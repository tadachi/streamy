/*
 * Component for twitch channel search.
 */
var MainTwitchComponent = React.createClass({

    twitch: new TwitchAPI(),
    typingDelay: new TypingDelay(),

    STATUS: {
        PENDING: '',
        SEARCHING: '...',
    },

    CATEGORIES: {
        TOPGAMES: 'Top Games',
        SPEEDRUNS: 'Speedruns',
        FOLLOWED: 'Followed'
    },

    getInitialState: function() {
        return {
            status: this.STATUS.PENDING,
            streams: '',
            games: '',

            window_inner_width: window.innerWidth,
            window_inner_height: window.innerHeight,
            search_twitch_width:  $('#flex_search').width(),
            search_twitch_height:  $('#flex_search').height() - MAGIC_MARGIN,
            player_width:  $('#flex_player').width(),
            player_height: $('#flex_player').height() - MAGIC_MARGIN,

            connect_twitch_button_display: '',

            games_offset: 0, // offset for getting the next set of games.
            prev_visibility_button: '',
            games_display: 'initial',
        };
    },

    showPrevGamesHandle: function(e) {
        // Show games even if it is hidden.
        this.state.games_display= 'initial';

        this.setState({state: this.state.games_offset -= 15});
        if (this.state.games_offset <= 0) {
            // Hide prev button.
            this.setState({prev_visibility_button: 'hidden'});
            this.setState({state: this.state.games_offset = 0});
        }
        // console.log(this.state.offset);
        this.twitch.searchTopStreamedGames(15, this.state.games_offset, function(data) {
            this.setState({games: data});
            // console.log(data);
        }.bind(this));
    },

    showNextGamesHandle: function(e) {
        // Show games even if it is hidden.
        this.state.games_display = 'initial';
        this.setState({display: ''});
        // Show prev button.
        this.setState({prev_visibility_button: ''});

        this.setState({state: this.state.games_offset += 15});

        // console.log(this.state.offset);
        this.twitch.searchTopStreamedGames(15, this.state.games_offset, function(data) {
            this.setState({games: data});
            // console.log(data);
        }.bind(this));
    },

    showHideHandle: function(e) {
        if (this.state.games_display == 'initial') {
            this.setState({games_display: 'none'});
        } else {
            this.setState({games_display: 'initial'});
        }
    },

    hideGames: function() {
        this.setState({games_display: 'none'});
    },

    showGames: function() {
        this.setState({games_display: 'initial'});
    },

    search: function(query = null) {
        let value = this.refs.selectInput.value;

        if (!query) {
            query = this.refs.searchInput.value; // this is the search data
        }

        this.setState({ streams: ''}); // Empty list.

        switch(value) {
            case this.CATEGORIES.TOPGAMES:
                this.twitch.searchForGame(query, function(data) {
                    this.showGames();
                    this.setState({ state: this.STATUS.PENDING});
                    this.setState({ games: data });
                }.bind(this));
                break;
            default:
                this.twitch.searchForStream(query, function(data) {
                    this.hideGames();
                    this.setState({ state: this.STATUS.PENDING});
                    this.setState({ streams: data });
                }.bind(this));
                break;
        }

    },

    searchStreamsOfGame: function(query = null) {
        console.log(query);
        this.setState({ streams: ''}); // Empty list.
        this.twitch.searchForStreamsOfGame(query, function(data) {
            this.setState({ state: this.STATUS.PENDING});
            this.setState({ streams: data });
        }.bind(this));
    },


    doSearchDelayed: function() {
        this.setState({state: this.STATUS.SEARCHING});
        this.typingDelay.delayedRun(this.search);
    },

    setChannel: function(channel) {
        $('#' + this.props.player.div_id).show();
        this.hideGames();
        this.props.player.setChannel(channel);
        // Setup to load chat.
        this.props.setChatChannel(channel);
    },

    selectGame: function(game) {
        // Pass game to parent to use it as a query.
        this.hideGames();
        this.searchStreamsOfGame(game);
    },

    selectCategoryHandle: function() {
        let value = this.refs.selectInput.value;
        switch(value) {
            case this.CATEGORIES.TOPGAMES:
                this.showGames();
                break;
            case this.CATEGORIES.SPEEDRUNS:
                this.hideGames();
                this.twitch.getSpeedrunStreams(function(data) {
                    this.setState({ streams: data });
                }.bind(this));
                break;
            case this.CATEGORIES.FOLLOWED:
                this.hideGames();
                this.twitch.getFollowedStreams(function(data) {
                    this.setState({ streams: data });
                }.bind(this));
                break;
        }
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
        let value = this.refs.selectInput.value;

        // Set flex'ed sizes
        $('#twitch_player').find('iframe').css('width', $('#flex_player').width());
        $('#twitch_player').find('iframe').css('height', this.state.window_inner_height - MAGIC_MARGIN);

        window.addEventListener('resize', this.handleResize);

        // Hide prev button because Top Games start at the top.
        this.setState({prev_visibility_button: 'hidden'});

        // Set the top games on mount
        this.twitch.searchTopStreamedGames(15, 0, function(data) {
            this.setState({games: data});
        }.bind(this));

        // Hide button on first mounting
        if (this.twitch.getAuthToken()) {
            this.setState({connect_twitch_button_display: 'none'})
        }

        // Continue to check if token hasn't expired.
        setInterval(function() {
            if (this.twitch.getAuthToken()) {
                this.setState({connect_twitch_button_display: 'none'})
            }
        }.bind(this), 1000);

        setInterval(function() {
            if (value == this.CATEGORIES.FOLLOWED) {
                this.twitch.getFollowedStreams(function(data) {
                    this.setState({ streams: data });
                }.bind(this));
            }
        }.bind(this), 10000);
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
        };

        var flex_div = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',

            width: 'inherit',
            padding: '5px',
            backgroundColor: '#E0E2E4',
        };

        var flex_button_area = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            backgroundColor: '#E0E2E4',
            marginBottom: '10px',
        };

        var login = {
            display: this.state.connect_twitch_button_display,

            width: '147px',
            margin: '5px',
        };

        var input = {
            width: '142px',
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

        var streams_list_view = {
            maxWidth: '300px',
            height: (this.state.window_inner_height-MAGIC_MARGIN) + 'px',
            maxHeight: (this.state.window_inner_height-MAGIC_MARGIN) + 'px',
        };

        var game_list_view = {
            maxWidth: '300px',
            height: (this.state.window_inner_height-MAGIC_MARGIN) + 'px',
            maxHeight: (this.state.window_inner_height-MAGIC_MARGIN) + 'px',
        };

        var prev_button = {
            visibility: this.state.prev_visibility_button,
            margin: '10px',
        }

        var button = {
            margin: '10px',
        }

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
                    onChange={this.doSearchDelayed}
                    />

                    <b>this.state.status</b>

                    <select style={select} ref='selectInput' defaultValue="TOPGAMES" onChange={this.selectCategoryHandle}>
                            <option value={this.CATEGORIES.TOPGAMES}>{this.CATEGORIES.TOPGAMES}</option>
                            <option value={this.CATEGORIES.SPEEDRUNS}>{this.CATEGORIES.SPEEDRUNS}</option>
                            <option value={this.CATEGORIES.FOLLOWED}>{this.CATEGORIES.FOLLOWED}</option>
                    </select>
                </div>

                <div style={flex_button_area}>
                    <button style={prev_button} onClick={this.showPrevGamesHandle}>Prev</button>
                    <button style={button} onClick={this.showHideHandle}>Show/Hide Games</button>
                    <button style={button} onClick={this.showNextGamesHandle}>Next</button>
                </div>

                <SelectorForTwitchGames style={game_list_view} selectGame={this.selectGame} data={this.state.games} display={this.state.games_display} />
                <ListViewTwitchStreams style={streams_list_view} setChannel={this.setChannel} data={this.state.streams} />
            </div>
        );
    }
});
