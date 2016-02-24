/*
 * Component for twitch channel search.
 */
var SearchBoxForTwitchStreams = React.createClass({

    twitch: new TwitchAPI(),
    typingDelay: new TypingDelay(),

    getInitialState: function() {
        return {
            state: '...',
            data: ''
        };
    },

    search: function(query = null) {
        if (!query) {
            query = this.refs.searchInput.getDOMNode().value; // this is the search data
        }

        this.twitch.searchForStream(query, function(response) {
            this.setState({ state: '...'});
            this.setState({ data: response });
        }.bind(this));
    },

    doSearch: function() {
        this.setState({state: 'searching...'});
        this.typingDelay.delayedRun(this.search);
    },

    componentDidMount: function() {
        this.search('starcraft');
    },

    render: function() {
        // Inline CSS
        var table_row = {
            width: '200px'
        };

        return (
                <div>
                    <input
                    style={table_row}
                    type="text"
                    ref="searchInput"
                    placeholder="Search Twitch User Name"
                    value={this.props.query}
                    onChange={this.doSearch}
                    />
                {this.state.state}
                <ListViewTwitchStreams data={this.state.data} />
                </div>
        );
    }
});

var ListViewTwitchStreams = React.createClass({

    getInitialState: function () {
        return { user_default_icon: '', display: 'none' };
    },

    handleMouseOver: function(index) {
        this.refs[index].showPreview();
    },

    handleMouseOut: function(index) {
        this.refs[index].hidePreview();
    },

    render: function() {
        var listView;

        // CSS inline styles
        var list = {
            width: '300px',
            display: 'block',
            padding: '10px',
            border: '1px solid black',
            fontWeight: 'bold'
        };

        //{stream.channel.name} {stream.channel.logo} {stream.game} {stream.viewers} {stream.preview.small}
        // <td>
        //     {/*<TwitchUserLogo src={item.channel.logo}/>*/}
        //     {/*<img style={icon_logo} src={user_default_icon} />*/}
        // </td>
        // <td style={td}>{item.channel.name}</td>
        // <td style={td}>{item.channel.game}</td>
        // <td style={td}>{item.viewers}</td>
        // onMouseMove={this.showPreview} onMouseOut={this.hidePreview}
        // <tbody>
        // <tr>
        //     <td rowspan="2"><img class="icon-logo" src="{{channel.image.size70}}"
        //         onerror="this.src='https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png'"/></td>
        //     <td class="stream-name">{{channel.display_name}}</td>
        //     <td class="viewer-count">{{channel.current_viewers}}</td>
        // </tr>
        // <tr>
        //     <td class="description">{{channel.title}}</td>
        //     <td></td>
        // </tr>
        // </tbody>
        if (this.props.data.streams) {
            listView = this.props.data.streams.map(function(stream, i) {
                return (
                    // <div style={list} key={i} onMouseMove={this.handleMouseOver.bind(this, i)} onMouseOut={this.handleMouseOut.bind(this, i)}>
                    //     {stream.channel.name} {stream.channel.game} {stream.viewers}
                    //     <HoverStreamPreview key={i} ref={i} stream={stream} />
                    // </div>
                    <tbody key={i} onMouseMove={this.handleMouseOver.bind(this, i)} onMouseOut={this.handleMouseOut.bind(this, i)}>
                        <tr>
                            <td rowspan="2">
                                <TwitchUserLogo src={stream.channel.logo}/>
                            </td>
                            <td>{stream.channel.name}</td>
                            <td>{stream.viewers}</td>
                        </tr>
                        <tr>
                            <td>
                                <HoverStreamPreview key={i} ref={i} stream={stream} />
                            </td>
                        </tr>
                    </tbody>
                );
            }.bind(this));
        }

        return (
            <div>
                {/*{listView}*/}
                <table>
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
