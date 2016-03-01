/*
 * Component for twitch channel search.
 */
var SearchBoxForTwitchStreams = React.createClass({

    twitch: new TwitchAPI(),
    typingDelay: new TypingDelay(),

    getInitialState: function() {
        return {
            state: '...',
            searchType: 'stream',
            data: '',
        };
    },

    search: function(query = this.refs.searchInput.getDOMNode().value) {

        this.twitch.searchForStream(query, function(data) {
            if (data) {
                this.setState({ state: 'found!'});
                this.setState({ data: data });
            } else {
                this.setState({ state: '...'});
                this.setState({ data: '' });
            }
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
                    <SelectorTwitch />
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

var SelectorTwitch = React.createClass({

    twitch: new TwitchAPI(),

    getInitialState: function() {
        return {
            offset: 0, // offset for getting the next set of games.
            data: '',
        };
    },

    componentDidMount: function() {
        // data.top[i].channels number of people streaming that game
        // data.top[i].viewers number of viewers watching
        // data.top[i].name name of game
        // data.top[i].logo.large logo of game
        // data.top[i].logo.large box of game
        this.twitch.searchTopStreamedGames(30, 0, function(data) {
            this.setState({data: data});
            // console.log(data);
        }.bind(this));
    },

    buttonHandle: function(e) {
        this.setState({state: this.state.offset += 30});
        console.log(this.state.offset);
        this.twitch.searchTopStreamedGames(30, this.state.offset, function(data) {
            this.setState({data: data});
            // console.log(data);
        }.bind(this));
    },

    render: function() {
        var listView;

        if (this.state.data) {

            // {top.game.name} {top.viewers} {top.channels} {top.game.box.large}
            listView = this.state.data.top.map(function(top, i) {
                // console.log(top);
                return (
                    <tbody key={i} >
                        <tr>
                            <td>
                                {top.game.name}
                            </td>
                            <td>
                                {top.viewers}
                            </td>
                        </tr>
                    </tbody>
                );
            }.bind(this));
        }


        return (
            <div>
                <table>
                    <button onClick={this.buttonHandle}>Show More</button>
                    {listView}
                </table>
            </div>
        );
    }
});



var HoverStreamPreview = React.createClass({

    default_src: 'https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png',

    getInitialState: function () {
        return {display: 'none'};
    },

    showPreview: function(e) {
        if (this.props.stream) {
            this.setState({display: 'inline-block'});
        }
    },

    hidePreview: function(e) {
        if (this.props.stream) {
            this.setState({display: 'none'});
        }
    },

    render: function() {
        var div = {
            border: '5px solid black',
            zIndex: '2',
            display: this.state.display,
        };

        if (this.props.stream) {
            if (this.props.stream.channel.logo) {
                return (
                    <div style={div}>
                        <TwitchUserLogo src={this.props.stream.channel.logo}/>
                        <TwitchStreamPreviewImg src={this.props.stream.preview.medium}/>
                    </div>
                );
            }
            return (
                <div style={div}>
                    <TwitchUserLogo />
                    <TwitchStreamPreviewImg />
                </div>
            );
        }

    }
});

var TwitchUserLogo = React.createClass({

    default_src: 'https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png',

    render: function () {
        // CSS inline styles
        var icon_logo = {
            width: '75px',
            height: '75px'
        };

        if (this.props.src) {
            return <img style={icon_logo} src={this.props.src} />;
        }

        return <img style={icon_logo} src={this.default_src} />;
    }

});

var TwitchStreamPreviewImg = React.createClass({

    default_src: 'https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png',

    render: function () {
        // CSS inline styles
        var preview = {
            display: 'inline-block',
            width: '115px',
            height: '75px',
            padding: '5px'
        };

        if (this.props.src) {
            return <img style={preview} src={this.props.src} />;
        }

        return <img style={preview} src={this.default_src} />;
    }

});
