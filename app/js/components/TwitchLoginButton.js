var TwitchLoginButton = React.createClass({

    twitch: new TwitchAPI(),

    getInitialState: function() {
        return {
            data: ''
        };
    },

    login: function() {
        this.twitch.authenticate();
        this.twitch.getFollowedStreams( function(data) {
            this.setState({ data: data });
        }.bind(this));
    },

    componentDidMount: function() {
        console.log(this.twitch.getAuthToken());
        this.twitch.getFollowedStreams( function(data) {
            this.setState({ data: '' });
        }.bind(this));
    },

    clear: function() {
        this.setState({data: ''});
    },

    render: function() {
        return (
            <div>
                <img onClick={this.login} src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png" href="#" />
                <ListViewTwitchStreams data={this.state.data} />
            </div>
        );
    }
});
