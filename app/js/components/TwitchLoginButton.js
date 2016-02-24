var TwitchLoginButton = React.createClass({

    twitch: new TwitchAPI(),

    login: function() {
        // this.twitch.authenticate();
        this.twitch.getFollowedStreams( function(data) {
            console.log(data);
        });
    },

    render: function() {
        return (
            <div>
                <img onClick={this.login} src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png" href="#" />
            </div>
        );
    }
});
