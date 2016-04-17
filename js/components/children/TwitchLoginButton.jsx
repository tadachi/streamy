var React = require('react');
var TwitchAPI = require('../../api_wrappers/twitch-api.js');
var GLOBALS = require('../../GLOBALS.js');

var TwitchLoginButton = React.createClass({

    twitch: new TwitchAPI(),

    login: function() {
        this.twitch.authenticate(GLOBALS.REDIRECT_URI, GLOBALS.CLIENT_ID);
    },

    render: function() {
        return (
            <img style={this.props.style} onClick={this.login} src="https://ttv-api.s3.amazonaws.com/assets/connect_dark.png" href="#" />
        );
    }
});

module.exports = TwitchLoginButton;
