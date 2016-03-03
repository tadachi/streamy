var SelectorForTwitchGames = React.createClass({

    twitch: new TwitchAPI(),

    getInitialState: function() {
        return {
            offset: 0, // offset for getting the next set of games.
            display_bool: true,
            display: '', // hide/show selector by changing it to none or '', inline, etc.
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
            this.setState({display: ''});
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

        var td = {
            maxWidth: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        };

        var game_name = {
            paddingBottom: '10px',
            paddingLeft: '5px',
        	fontSize: '12px',
            fontWeight: 'bold',
            color: 'blue',

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
            paddingLeft: '5px'
        };

        if (this.state.data) {
            // {top.game.name} {top.viewers} {top.channels} {top.game.box.large} {top.game.box.medium}
            listView = this.state.data.top.map(function(top, i) {
                // console.log(top);
                return (
                    <tbody style={tbody} key={i} >
                        <tr>
                            <td style={td} colSpan="2">
                                <span style={game_name}>
                                    {top.game.name}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td style={channels}>
                                <img onMouseMove={this.handleMouseOver.bind(this, i)} onMouseOut={this.handleMouseOut.bind(this, i)} style={icon} src="assets/streamer_icon.png" />
                                {top.channels}
                            </td>
                            <td style={viewers}>
                                <img style={icon} src="assets/live_viewer_icon.png" />
                                {top.viewers}
                            </td>
                        </tr>
                        <tr>
                            <td style={preview} colSpan="2">
                                <HoverGamePreview key={i} ref={i} game_logo={top.game.box.medium} />
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
