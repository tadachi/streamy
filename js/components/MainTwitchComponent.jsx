var React = require('react');
var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

var TwitchAPI = require('../api_wrappers/twitch-api.js');
var TypingDelay = require('../lib/TypingDelay.js');

// Lib
var Util = require('../lib/util.js');

// components
var TwitchLoginButton = require('./children/TwitchLoginButton.jsx');
var SelectorForTwitchGames = require('./children/SelectorForTwitchGames.jsx');
var ListViewTwitchStreams = require('./children/ListViewTwitchStreams.jsx');

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
        SEARCH: 'Search',
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
            search_width:  $('#' + this.props.search_div).width(),
            search_height:  $('#' + this.props.search_div).height() - GLOBALS.MAGIC_MARGIN,
            player_width:  $('#' + this.props.player_div).width(),
            player_height: $('#' + this.props.player_div).height() - GLOBALS.MAGIC_MARGIN,
            chat_width:  $('#' + this.props.chat_div).width(),
            chat_height: $('#' + this.props.chat_div).height() - GLOBALS.MAGIC_MARGIN,

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

        this.twitch.searchTopStreamedGames(15, this.state.games_offset, function(data) {
            this.setState({games: data});
        }.bind(this));
    },

    showNextGamesHandle: function(e) {
        // Show games even if it is hidden.
        this.state.games_display = 'initial';
        this.setState({display: ''});
        // Show prev button.
        this.setState({prev_visibility_button: ''});

        this.setState({state: this.state.games_offset += 15});

        this.twitch.searchTopStreamedGames(15, this.state.games_offset, function(data) {
            this.setState({games: data});
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
        if (!query) {
            query = this.refs.searchInput.value; // this is the search data
        }

        this.setState({ streams: ''}); // Empty list.

        switch(this.refs.selectInput.value) {
            case this.CATEGORIES.TOPGAMES:
                this.twitch.searchForGame(query, function(data) {
                    this.showGames();
                    this.setState({ status: this.STATUS.PENDING});
                    this.setState({ games: data });
                }.bind(this));
                break;
            default:
                this.twitch.searchForStream(query, function(data) {
                    console.log(query);
                    console.log(data);
                    this.hideGames();
                    this.setState({ status: this.STATUS.PENDING});
                    this.setState({ streams: data });
                }.bind(this));
                break;
        }

    },

    searchStreamsOfGame: function(query = null) {
        this.setState({ streams: ''}); // Empty list.
        this.twitch.searchForStreamsOfGame(query, function(data) {
            this.setState({ status: this.STATUS.PENDING});
            this.setState({ streams: data });
        }.bind(this));
    },


    doSearchDelayed: function() {
        if (this.refs.selectInput.value != this.CATEGORIES.TOPGAMES) {
            this.refs.selectInput.value = this.CATEGORIES.SEARCH;
        }

        this.setState({status: this.STATUS.SEARCHING});
        this.typingDelay.delayedRun(this.search);
    },

    setChannel: function(channel) {
        this.hideGames();
        // Setup video player.
        this.props.TwitchPlayer.setChannel(channel);
        // Setup to load chat.
        this.props.TwitchChat.setChatChannel(channel);
    },

    selectGame: function(game) {
        // Pass game to parent to use it as a query.
        this.hideGames();
        this.refs.selectInput.value = this.CATEGORIES.SEARCH;
        this.searchStreamsOfGame(game);
    },

    selectCategoryHandle: function() {
        let value = this.refs.selectInput.value;
        switch(value) {
            case this.CATEGORIES.TOPGAMES:
                this.twitch.searchTopStreamedGames(15, 0, function(data) {
                    this.showGames();
                    this.setState({games: data});
                }.bind(this));
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
        this.setState({ search_width: $('#' + this.props.search_div).width() });
        this.setState({ search_height: window.innerHeight - GLOBALS.MAGIC_MARGIN });
        this.setState({ player_width: $('#' + this.props.player_div).width() });
        this.setState({ player_height: window.innerHeight - GLOBALS.MAGIC_MARGIN });
        this.setState({ chat_width: $('#' + this.props.chat_div).width() });
        this.setState({ chat_height: window.innerHeight - GLOBALS.MAGIC_MARGIN });

        // New
        $('#' + this.props.search_div).css('height', this.state.search_height);
        $('#' + this.props.chat_div).css('height', this.state.chat_height);
        $('#' + this.props.player_div).css('height', this.state.player_height);
        this.props.TwitchPlayer.setWidth(this.state.player_width);
        this.props.TwitchPlayer.setHeight(this.state.player_height);
        this.props.TwitchChat.setWidth(this.state.chat_width);
        this.props.TwitchChat.setHeight(this.state.chat_height);

        // Debug
        // console.log('handleResize:');
        // console.log('window w ' + window.innerWidth);
        // console.log('window h ' + window.innerHeight);
        // console.log('search w ' + $('#' + this.props.search_div).width());
        // console.log('search h ' + $('#' + this.props.search_div).height());
        // console.log('player w ' + $('#' + this.props.player_div).width());
        // console.log('player h ' + $('#' + this.props.player_div).height());
    },

    componentDidMount: function() {
        // Set flex'ed sizes
        this.setState({ player_width: $('#' + this.props.player_div).width() });
        this.setState({ player_height: window.innerHeight });
        this.props.TwitchPlayer.setWidth(this.state.player_width);
        this.props.TwitchPlayer.setHeight(this.state.player_height);

        window.addEventListener('resize', this.handleResize);

        // Hide prev button because Top Games start at the top.
        this.setState({prev_visibility_button: 'hidden'});

        // Set the top games on mount
        this.twitch.searchTopStreamedGames(15, 0, function(data) {
            this.setState({games: data});
        }.bind(this));

        // Hide button on first mounting
        if (this.twitch.getAuthToken()) {
            this.setState({connect_twitch_button_display: 'none'}); // Hide button.
            this.refs.selectInput.value = this.CATEGORIES.FOLLOWED; // Default to Followed
            this.hideGames(); // Hide games
            this.twitch.getFollowedStreams(function(data) { // Set data to followed games
                this.setState({ streams: data });
            }.bind(this));
        }

        setInterval(function() {
            switch(this.refs.selectInput.value) {
                case this.CATEGORIEES.FOLLOWED:
                    this.twitch.getFollowedStreams(function(data) { // Set data to followed games
                        this.setState({ streams: data });
                        console.log(this.CATEGORIES.FOLLOWED + ' updated.');
                    }.bind(this));
                    break;
                case this.CATEGORIES.SPEEDRUNS:
                    this.twitch.getSpeedrunStreams(function(data) {
                        this.setState({ streams: data });
                        console.log(this.CATEGORIES.SPEEDRUNS + ' updated.');
                    }.bind(this));
                    break;
            }
        }.bind(this), 30000)

        setInterval(function() {
            if (this.twitch.getAuthToken()) {
                this.setState({connect_twitch_button_display: 'none'}); // Hide Twitch Auth button.
            }
        }.bind(this), 1000);

        var streamer = Util.getQueryStringParams("streamer");
        if (streamer) {
            this.props.TwitchPlayer.setChannel(streamer);
            this.props.TwitchChat.setChatChannel(streamer);
        }

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
            height: (this.state.window_inner_height-GLOBALS.MAGIC_MARGIN-87) + 'px', //87 is the height of the flex_button_area
            maxHeight: (this.state.window_inner_height-GLOBALS.MAGIC_MARGIN-87) + 'px',
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            backgroundColor: '#E0E2E4',
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

        var prev_button = {
            visibility: this.state.prev_visibility_button,
            margin: '10px',
        }

        var button = {
            margin: '10px',
        }

        var status= {
            fontSize: '15px',
        }

        return (
            <div>
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

                    <b style={status}>{this.state.status}</b>

                    <select style={select} ref='selectInput' defaultValue="TOPGAMES" onChange={this.selectCategoryHandle}>
                            <option value={this.CATEGORIES.TOPGAMES}>{this.CATEGORIES.TOPGAMES}</option>
                            <option value={this.CATEGORIES.SEARCH}>{this.CATEGORIES.SEARCH}</option>
                            <option value={this.CATEGORIES.SPEEDRUNS}>{this.CATEGORIES.SPEEDRUNS}</option>
                            <option value={this.CATEGORIES.FOLLOWED}>{this.CATEGORIES.FOLLOWED}</option>
                    </select>

                    <div style={flex_button_area}>
                        <button style={prev_button} onClick={this.showPrevGamesHandle}>Prev</button>
                        <button style={button} onClick={this.showHideHandle}>Show/Hide Games</button>
                        <button style={button} onClick={this.showNextGamesHandle}>Next</button>
                    </div>
                </div>

                <div id='search' style={search}>
                    <SelectorForTwitchGames selectGame={this.selectGame} data={this.state.games} display={this.state.games_display} />
                    <ListViewTwitchStreams setChannel={this.setChannel} data={this.state.streams} />
                </div>
            </div>
        );
    }
});

// Export on bottom to avoid invariant errors from React.
module.exports = MainTwitchComponent;
