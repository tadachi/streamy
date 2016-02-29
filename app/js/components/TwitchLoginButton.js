var TwitchLoginButton = React.createClass({

    twitch: new TwitchAPI(),

    login: function() {
        this.twitch.authenticate();
    },

    render: function() {
        return (
            <img onClick={this.login} src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png" href="#" />
        );
    }
});
