var HoverGamePreview = React.createClass({
    default_src: 'https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png',

    getInitialState: function () {
        return {display: 'none'};
    },

    showPreview: function(e) {
        if (this.props.game_logo) {
            this.setState({display: 'inline-block'});
        }
    },

    hidePreview: function(e) {
        if (this.props.game_logo) {
            this.setState({display: 'none'});
        }
    },

    render: function() {
        var hover = {
            display: this.state.display,
        };

        if (this.props.game_logo) {
            return (
                <div style={hover}>
                    <TwitchGameLogo src={this.props.game_logo} />
                </div>

            );
        }

        return (
            <TwitchGameLogo />
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
                        <TwitchStreamPreviewImg src={this.props.stream.preview.medium}/>
                    </div>
                );
            }
            return (
                <div style={div}>
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

var TwitchGameLogo = React.createClass({

    default_src: 'http://static-cdn.jtvnw.net/ttv-static/404_boxart-136x190.jpg',

    render: function () {
        // CSS inline styles
        var preview = {
            display: 'inline-block',
            width: '136px',
            height: '190px',
        };

        if (this.props.src) {
            return <img style={preview} src={this.props.src} />;
        }

        return <img style={preview} src={this.default_src} />;
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
