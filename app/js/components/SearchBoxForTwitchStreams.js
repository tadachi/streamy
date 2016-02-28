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

        this.twitch.searchForStream(query, function(data) {
            this.setState({ state: '...'});
            this.setState({ data: data });
        }.bind(this));
    },

    doSearch: function() {
        this.setState({state: 'searching...'});
        this.typingDelay.delayedRun(this.search);
    },

    componentDidMount: function() {
        // this.search('starcraft');
    },

    render: function() {

        // Inline CSS.
        var input = {
            width: '200px'
        };

        return (
                <div>
                    <input
                    style={input}
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

        var table = {
            width: '100px',
            margin: '0px',
            border: '0px',
            padding: '0px'
        };

        var logo = {
            padding: '5px'
        };

        var name = {
            padding: '5px',
        	fontSize: '18px',
            fontWeight: 'bold',
            color: '#000066' /*~ darkgreen */
        };

        var viewers = {
            padding: '5px',
            fontSize: '14px',
            color: 'red',
            textAlign: 'right'
        };

        var status = {
            paddingLeft: '5px',
            maxWidth: '50px', /* To clip text with an ellipsis when it overflows a table cell */
        	fontSize: '14px',
        	color: 'white',

            overflow: 'hidden',
            whiteSpace: 'nowrap',
        };

        //{stream.channel.name} {stream.channel.status} {stream.channel.logo} {stream.game} {stream.viewers} {stream.preview.small}
        // console.log(this.props.data);
        if (this.props.data) {
            listView = this.props.data.streams.map(function(stream, i) {
                return (
                    // <div style={list} key={i} onMouseMove={this.handleMouseOver.bind(this, i)} onMouseOut={this.handleMouseOut.bind(this, i)}>
                    //     {stream.channel.name} {stream.channel.game} {stream.viewers}
                    //     <HoverStreamPreview key={i} ref={i} stream={stream} />
                    // </div>
                    // onMouseMove={this.handleMouseOver.bind(this, i)} onMouseOut={this.handleMouseOut.bind(this, i)}
                    <tbody style={table} key={i} >
                        <tr>
                            <td style={logo} rowSpan="2">
                                <TwitchUserLogo src={stream.channel.logo}/>
                            </td>
                            <td style={name}>{stream.channel.name}</td>
                            <td style={viewers}>{stream.viewers}</td>
                        </tr>
                        <tr>
                            <td style={status}>{stream.channel.status}</td>
                            <td></td>
                        </tr>
                        {/*<tr>
                            <td>
                                <HoverStreamPreview key={i} ref={i} stream={stream} />
                            </td>
                        </tr>*/}
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
