var React = require('react');

/**
 * Small components that are easily understood and can be used in iteration.
 */

var UserLogo = React.createClass({

    default_src: 'https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png',

    render: function () {
        // CSS inline styles
        if (this.props.src) {
            return <img style={this.props.style} src={this.props.src} />;
        }

        return <img style={this.props.style} src={this.default_src} />;
    }

});

var GameLogo = React.createClass({

    default_src: 'http://static-cdn.jtvnw.net/ttv-static/404_boxart-136x190.jpg',

    render: function () {
        // CSS inline styles
        var preview = {
            display: 'inherit',
            opacity: 'inherit',
            width: 'inherit',
            height: 'inherit',
        };

        if (this.props.src) {
            return <img style={preview} src={this.props.src} />;
        }

        return <img style={preview} src={this.default_src} />;
    }

});

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
                    <GameLogo src={this.props.game_logo} />
                </div>

            );
        }

        return (
            <GameLogo />
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

module.exports = {
    UserLogo,
    GameLogo,
    HoverGamePreview,
    HoverStreamPreview,
    TwitchStreamPreviewImg,
}
