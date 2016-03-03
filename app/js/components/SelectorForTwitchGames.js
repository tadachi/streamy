var SelectorForTwitchGames = React.createClass({

    twitch: new TwitchAPI(),

    getInitialState: function() {
        return {
            offset: 0, // offset for getting the next set of games.
            display_bool: true,
            display: 'inline-block', // hide/show selector by changing it to none or inline-block, etc.
            data: '',
        };
    },

    componentDidMount: function() {
        // data.top[i].channels number of people streaming that game
        // data.top[i].viewers number of viewers watching
        // data.top[i].name name of game
        // data.top[i].logo.large logo of game
        // data.top[i].logo.large box of game
        this.twitch.searchTopStreamedGames(25, 0, function(data) {
            this.setState({data: data});
            // console.log(data);
        }.bind(this));
    },

    showPrevHandle: function(e) {
        this.setState({state: this.state.offset -= 25});
        if (this.state.offset <= 0) {
            this.setState({state: this.state.offset = 0});
        }
        // console.log(this.state.offset);
        this.twitch.searchTopStreamedGames(25, this.state.offset, function(data) {
            this.setState({data: data});
            // console.log(data);
        }.bind(this));
    },

    showNextHandle: function(e) {
        this.setState({state: this.state.offset += 25});
        // console.log(this.state.offset);
        this.twitch.searchTopStreamedGames(25, this.state.offset, function(data) {
            this.setState({data: data});
            // console.log(data);
        }.bind(this));
    },

    showHideHandle: function(e) {
        this.state.display_bool = !this.state.display_bool;
        if (this.state.display_bool) {
            this.setState({display: 'inline-block'});
        } else {
            this.setState({display: 'none'});
        }
    },

    handleMouseOver: function(index) {
        this.refs[index].showPreview();
    },

    handleMouseOut: function(index) {
        this.refs[index].hidePreview();
    },

    render: function() {
        var listView;

        var table = {
            display: this.state.display,
            width: '200px'
        };

        var tbody = {
            // border: '1px solid #ccc'
        };

        var game_name = {
            maxWidth: '80%',
            paddingBottom: '10px',
            marginLeft: '5px',
        	fontSize: '12px',
            fontWeight: 'bold',
            color: 'blue',
            textOverflow: 'ellipsis'
        };

        var channels = {
            paddingBottom: '5px',
            maxWidth: '40%',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'left',

            color: 'white'
        };

        var viewers = {
            paddingBottom: '5px',
            maxWidth: '40%',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'left',

            color: 'red',
        };

        var icon = {
            maxWidth: '50px',
            marginRight: '5px',
            marginLeft: '5px',
            width: '20px',
            height: '20px',
            verticalAlign: 'middle'
        };

        var preview = {
            textAlign: 'center'
        };

        if (this.state.data) {
            // {top.game.name} {top.viewers} {top.channels} {top.game.box.large}
            listView = this.state.data.top.map(function(top, i) {
                // console.log(top);
                return (
                    <tbody style={tbody} key={i} >
                        <tr>
                            <td colSpan="2">
                                <span onMouseMove={this.handleMouseOver.bind(this, i)} onMouseOut={this.handleMouseOut.bind(this, i)} style={game_name}>
                                    {top.game.name}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td style={channels}>
                                <img style={icon} src="https://assistly-production.s3.amazonaws.com/twitchtv/portal_attachments/349942/broadcaster-background_original.png?AWSAccessKeyId=AKIAJNSFWOZ6ZS23BMKQ&Expires=1456896548&Signature=HEqoaALPWtOyXzf%2Fpd5eGpKxYQQ%3D&response-content-disposition=filename%3D%22broadcaster-background.png%22&response-content-type=image%2Fpng" />
                                {top.channels}
                            </td>
                            <td style={viewers}>
                                <img style={icon} src="https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_purple.png" />
                                {top.viewers}
                            </td>
                        </tr>
                        <tr>
                            <td style={preview} colSpan="2">
                                <HoverGamePreview key={i} ref={i} game_logo={top.game.box.large} />
                            </td>
                        </tr>

                    </tbody>
                );
            }.bind(this));
        }


        return (
            <div>
                <button onClick={this.showHideHandle}>Show/Hide</button>
                <button onClick={this.showPrevHandle}>Prev</button>
                <button onClick={this.showNextHandle}>Next</button>
                <table style={table}>
                    {listView}
                </table>
            </div>
        );
    }
});
