var React = require('react');
var TwitchAPI = require('../../api_wrappers/twitch-api.js');

var TwitchLoginButton = React.createClass({

    twitch: new TwitchAPI(),

    login: function() {
        this.twitch.authenticate();
    },

    render: function() {
        return (
            <img style={this.props.style} onClick={this.login} src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png" href="#" />
        );
    }
});

module.exports = TwitchLoginButton;