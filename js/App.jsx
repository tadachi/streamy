var React = require('react');
var $ = require('jquery');
var GLOBALS = require('./GLOBALS.js');

var TwitchAPI = require('./api_wrappers/twitch-api.js');
var HitboxAPI = require('./api_wrappers/hitbox-api.js');
var TypingDelay = require('./lib/TypingDelay.js');

// Lib.
var Util = require('./lib/util.js');

// Components.
var TwitchLoginButton = require('./components/children/TwitchLoginButton.jsx');
var SelectorForGames = require('./components/children/SelectorForGames.jsx');
var ListViewStreams = require('./components/children/ListViewStreams.jsx');

/*
 * Parent component.
 */
var App = React.createClass({

    propTypes: {
        search_div: React.PropTypes.string.isRequired,
        chat_div: React.PropTypes.string.isRequired,
        player_div: React.PropTypes.string.isRequired,
        Chat: React.PropTypes.any.isRequired,
        TwitchPlayer: React.PropTypes.any.isRequired,
        HitboxPlayer: React.PropTypes.any.isRequired,
    },

    twitch: new TwitchAPI(),
    hitbox: new HitboxAPI(),
    typingDelay: new TypingDelay(),

    STATUS: {
        PENDING: '',
        SEARCHING: '...',
    },

    CATEGORIES: {
        TOPGAMES: 'Find Games (Top)',
        SEARCH: 'Search (Online)',
        SEARCHVODS: 'Search (Vods)',
        SPEEDRUNS: 'Speedruns',
        HITBOX: 'Hitbox',
        FOLLOWED: 'Followed',
        FOLLOWEDGAMES: 'Your Games',

    },

    OFFSET: 8,

    getInitialState: function() {
        return {
            status: this.STATUS.PENDING,
            streams: '',
            games: '',

            window_inner_width: window.innerWidth,
            window_inner_height: window.innerHeight - GLOBALS.MAGIC_MARGIN,
            search_width:  $('#' + this.props.search_div).width(),
            search_height:  $('#' + this.props.search_div).height(),
            player_width:  $('#' + this.props.player_div).width(),
            player_height: $('#' + this.props.player_div).height(),
            chat_width:  $('#' + this.props.chat_div).width(),
            chat_height: $('#' + this.props.chat_div).height(),

            connect_twitch_button_display: '',

            games_offset: 0, // offset for getting the next set of games.
            prev_visibility_button: '',
            games_display: 'initial',
            
            button_area_width: 0,
            button_area_height: 0,
        };
    },

    showPrevGamesHandle: function(e) {
        // Show games even if it is hidden.
        this.state.games_display= 'initial';

        this.setState({state: this.state.games_offset -= this.OFFSET});
        if (this.state.games_offset <= 0) {
            // Hide prev button.
            this.setState({prev_visibility_button: 'hidden'});
            this.setState({state: this.state.games_offset = 0});
        }

        this.twitch.searchTopStreamedGames(this.OFFSET, this.state.games_offset, function(data) {
            this.setState({games: data});
        }.bind(this));
    },

    showNextGamesHandle: function(e) {
        // Show games even if it is hidden.
        this.state.games_display = 'initial';
        this.setState({display: ''});
        // Show prev button.
        this.setState({prev_visibility_button: ''});

        this.setState({state: this.state.games_offset += this.OFFSET});

        this.twitch.searchTopStreamedGames(this.OFFSET, this.state.games_offset, function(data) {
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
        };

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

    setTwitchChannel: function(channel) {
        this.hideGames();
        // Remove HitboxPlayer
        this.props.HitboxPlayer.removeIframeVideo();
        // Setup video player.
        this.props.TwitchPlayer.reInitialize();
        this.props.TwitchPlayer.setChannel(channel);

        // Setup to load chat.
        this.props.Chat.setChatChannel(channel);
        // Loaded by a button.
        // this.props.Chat.loadTwitchChat();
    },

    setHitboxChannel: function(channel) {
        console.log('setHitboxChannel');
        this.hideGames();
        // Remove TwitchPlayer
        this.props.TwitchPlayer.clear();
        
        // Setup video player.
        this.props.HitboxPlayer.setChannel(channel);
        this.props.HitboxPlayer.loadVideoPlayer()
        // Setup to load chat.
        this.props.Chat.setChatChannel(channel);
        this.props.Chat.loadHitboxChat();
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
                this.twitch.searchTopStreamedGames(this.OFFSET, 0, function(data) {
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
            case this.CATEGORIES.HITBOX:
                this.hideGames();
                this.hitbox.getTopStreams(function(data) {
                    this.setState({ streams: data });
                }.bind(this));
                break;
            case this.CATEGORIES.FOLLOWED:
                this.hideGames();
                this.twitch.getFollowedStreams(function(data) {
                    this.setState({ streams: data });
                }.bind(this));
                break;
            case this.CATEGORIES.FOLLOWEDGAMES:
                this.twitch.getFollowedGames(this.twitch.getUserName(), function(data) {
                    this.showGames();
                    this.setState({games: data});
                }.bind(this))
                break;
        }
    },

    debugButton1() {
        this.props.TwitchPlayer.clear();
    },

    debugButton2() {
        this.props.TwitchPlayer.reInitialize();
    },

    /**
     * Handles the resizing of streams, videoplayer, chat.
     */
    handleResize: function(e) {
        this.setState({ window_inner_width: window.innerWidth});
        this.setState({ window_inner_height: window.innerHeight});
        let window_inner_height = this.state.window_inner_height;
        this.setState({ search_width: $('#' + this.props.search_div).width() });
        this.setState({ search_height: window_inner_height});
        this.setState({ player_width: $('#' + this.props.player_div).width() });
        this.setState({ player_height: window_inner_height});
        this.setState({ chat_width: $('#' + this.props.chat_div).width() });
        this.setState({ chat_height: window_inner_height});
        this.setState({button_area_width: $('#button_area').width()});
        this.setState({button_area_height: $('#button_area').height()});

        // Apply sizes to components.
        $('#' + this.props.search_div).css('height', this.state.search_height);
        $('#' + this.props.chat_div).css('height', this.state.chat_height);
        $('#' + this.props.player_div).css('height', this.state.player_height);
        this.props.TwitchPlayer.setWidth(this.state.player_width);
        this.props.TwitchPlayer.setHeight(this.state.player_height);
        this.props.HitboxPlayer.setWidth(this.state.player_width);
        this.props.HitboxPlayer.setHeight(this.state.player_height);
        this.props.Chat.setWidth(this.state.chat_width);
        this.props.Chat.setHeight(this.state.chat_height);

        // Debug
        // console.log('handleResize:');
        // console.log('window w ' + window.innerWidth);
        // console.log('window h ' + window.innerHeight);
        // console.log('search w ' + $('#' + this.props.search_div).width());
        // console.log('search h ' + $('#' + this.props.search_div).height());
        // console.log('player w ' + $('#' + this.props.player_div).width());
        // console.log('player h ' + $('#' + this.props.player_div).height());
        // console.log($('#button_area').width() + 'x' +  $('#button_area').height());
    },

    /**
     * Invoked after initial rendering occurs. Time to do anything that requires the initial render.
     */
    componentDidMount: function() {
        this.setState({ window_inner_width: window.innerWidth});
        this.setState({ window_inner_height: window.innerHeight});
        let window_inner_height = this.state.window_inner_height;
        this.setState({ search_width: $('#' + this.props.search_div).width() });
        this.setState({ search_height: window_inner_height});
        this.setState({ player_width: $('#' + this.props.player_div).width() });
        this.setState({ player_height: window_inner_height});
        this.setState({ chat_width: $('#' + this.props.chat_div).width() });
        this.setState({ chat_height: window_inner_height});
        this.setState({button_area_width: $('#button_area').width()});
        this.setState({button_area_height: $('#button_area').height()});

        // Apply sizes to components.
        $('#' + this.props.search_div).css('height', this.state.search_height);
        $('#' + this.props.chat_div).css('height', this.state.chat_height);
        $('#' + this.props.player_div).css('height', this.state.player_height);
        this.props.TwitchPlayer.setWidth(this.state.player_width);
        this.props.TwitchPlayer.setHeight(this.state.player_height);
        this.props.HitboxPlayer.setWidth(this.state.player_width);
        this.props.HitboxPlayer.setHeight(this.state.player_height);
        this.props.Chat.setWidth(this.state.chat_width);
        this.props.Chat.setHeight(this.state.chat_height);

        // Event listeners
        window.addEventListener('resize', this.handleResize);

        this.setState({button_area_width: $('#button_area').width()});
        this.setState({button_area_height: $('#button_area').height()});
        console.log($('#button_area').width() + 'x' +  $('#button_area').height());
        
        // Hide prev button because Top Games start at the top.
        this.setState({prev_visibility_button: 'hidden'});

        // Set the top games on mount
        this.twitch.searchTopStreamedGames(this.OFFSET, 0, function(data) {
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

        // Refresh Streams on certain categories.
        setInterval(function() {
            switch(this.refs.selectInput.value) {
                case this.CATEGORIES.FOLLOWED:
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
        }.bind(this), 60000)

        var authInterval = setInterval(function() { // Fast interval to check if logged in. Kills itself after logging in.
            if (this.twitch.getAuthToken()) {
                this.hideGames();
                this.twitch.getFollowedStreams(function(data) {
                    this.setState({ streams: data });
                    this.refs.selectInput.value = this.CATEGORIES.FOLLOWED; // Set select to FOLLOWED streams.
                }.bind(this));
                this.setState({connect_twitch_button_display: 'none'}); // Hide Twitch Auth button.
                console.log('hide button');
                clearInterval(authInterval); // Clear itself if Authed.
            }
        }.bind(this), 1000);

        var streamer = Util.getQueryStringParams('streamer');
        var api = Util.getQueryStringParams('api');
        if (streamer) {
            switch(api) {
                case 'hitbox':
                    // Remove TwitchPlayer
                    this.props.TwitchPlayer.clear();
                    this.props.HitboxPlayer.setChannel(streamer);
                    this.props.HitboxPlayer.loadVideoPlayer();
                    console.log('test');
                    break;
                    // this.props.Chat.setChatChannel(streamer);              
                case 'twitch':
                    this.props.TwitchPlayer.setChannel(streamer);
                    this.props.Chat.setChatChannel(streamer);
                    break;
                default:
                    this.props.TwitchPlayer.setChannel(streamer);
                    this.props.Chat.setChatChannel(streamer);
                    break;
            }
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
            height: (this.state.window_inner_height - this.state.button_area_height - GLOBALS.MAGIC_MARGIN) + 'px',
            maxHeight: (this.state.window_inner_height + this.state.button_area_height + GLOBALS.MAGIC_MARGIN) + 'px',
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
            width: '120px',
            height: '20px',
            margin: '5px',
        };

        var select = {
            width: '145px',
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
                
                    <div id='button_area' style={flex_button_area}>
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
                                <option value={this.CATEGORIES.SEARCHVODS}>{this.CATEGORIES.SEARCHVODS}</option>
                                <option value={this.CATEGORIES.HITBOX}>{this.CATEGORIES.HITBOX}</option>
                                <option value={this.CATEGORIES.SPEEDRUNS}>{this.CATEGORIES.SPEEDRUNS}</option>

                                {this.twitch.getAuthToken() ? 
                                    <option value={this.CATEGORIES.FOLLOWED}>{this.CATEGORIES.FOLLOWED}</option> : <option disabled value={this.CATEGORIES.FOLLOWED}>{this.CATEGORIES.FOLLOWED}</option>}
                                {this.twitch.getAuthToken() ? 
                                    <option value={this.CATEGORIES.FOLLOWEDGAMES}>{this.CATEGORIES.FOLLOWEDGAMES}</option> : <option disabled value={this.CATEGORIES.FOLLOWEDGAMES}>{this.CATEGORIES.FOLLOWEDGAMES}</option>}
                        </select>
                        <button style={prev_button} onClick={this.showPrevGamesHandle}>Prev</button>
                        <button style={button} onClick={this.showHideHandle}>Show/Hide Games</button>
                        <button style={button} onClick={this.showNextGamesHandle}>Next</button>
                    </div>
                </div>

                <div id='search' style={search}>
                    <SelectorForGames selectGame={this.selectGame} data={this.state.games} display={this.state.games_display} />
                    <ListViewStreams setTwitchChannel={this.setTwitchChannel} setHitboxChannel={this.setHitboxChannel} data={this.state.streams} />
                </div>
            </div>
        );
    }
});

// Export on bottom to avoid invariant errors from React.
module.exports = App;
