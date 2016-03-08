var SelectorForTwitchGames = React.createClass({

    twitch: new TwitchAPI(),

    getInitialState: function() {
        return {
            offset: 0, // offset for getting the next set of games.
            visibility_prev: '',
            display_bool: true,
            display: '', // hide/show selector by changing it to none or '', inline, etc.
            data: '',
        };
    },

    showPrevHandle: function(e) {
        // Show games even if it is hidden.
        this.state.display_bool = true;
        this.setState({display: ''});

        this.setState({state: this.state.offset -= 15});
        if (this.state.offset <= 0) {
            // Hide prev button.
            this.setState({visibility_prev: 'hidden'});
            this.setState({state: this.state.offset = 0});
        }
        // console.log(this.state.offset);
        this.twitch.searchTopStreamedGames(15, this.state.offset, function(data) {
            this.setState({data: data});
            // console.log(data);
        }.bind(this));
    },

    showNextHandle: function(e) {
        // Show games even if it is hidden.
        this.state.display_bool = true;
        this.setState({display: ''});
        // Show prev button.
        this.setState({visibility_prev: ''});

        this.setState({state: this.state.offset += 15});

        // console.log(this.state.offset);
        this.twitch.searchTopStreamedGames(15, this.state.offset, function(data) {
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

    selectGame: function(game) {
        this.state.display_bool = false;
        this.setState({display: 'none'});

        // Pass game to parent to use it as a query.
        this.props.search(game);
    },

    componentDidMount: function() {
        this.setState({visibility_prev: 'hidden'});
        // data.top[i].channels number of people streaming that game
        // data.top[i].viewers number of viewers watching
        // data.top[i].name name of game
        // data.top[i].logo.large logo of game
        // data.top[i].logo.large box of game
        this.twitch.searchTopStreamedGames(15, 0, function(data) {
            this.setState({data: data});
            // console.log(data);
        }.bind(this));
    },

    componentDidUpdate: function() {
    },

    render: function() {
        var listView;

        var table = {
            display: this.state.display,
            width: 'inherit',
            height: 'inherit',
            margin: '0px',
            border: '0px',
            padding: '0px',
        };

        var tbody = {
            // border: '1px solid #ccc'
        };

        var logo = {
            border: '1px solid black',
            // width: '52px',
            // height: '72px',
            // opacity: '0.7',
        };

        var game = {
            fontFamily: 'Droid Sans, serif',
            width: '248px',

            fontSize: '15px',
            fontWeight: 'bold',
            color: 'blue',

            border: '1px solid black',
        };

        var channels = {
            fontFamily: 'Droid Sans, serif',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'left',

            color: 'white',

            border: '1px solid black',
        };

        var viewers = {
            fontFamily: 'Droid Sans, serif',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'left',

            color: 'white',

            border: '1px solid black',
        };

        var icon = {
            maxWidth: '50px',
            marginRight: '5px',
            marginLeft: '5px',
            width: '20px',
            height: '20px',
            verticalAlign: 'middle',
        };

        if (this.state.data) {
            // console.log(this.state.data.top);
            // {top.game.name} {top.viewers} {top.channels} {top.game.box.large} {top.game.box.medium} {top.game.box.small}
            listView = this.state.data.top.map(function(top, i) {
                return (
                    <tbody style={tbody} key={i} >
                        <tr>
                            <td style={logo} rowSpan='2'>
                                <img onClick={this.selectGame.bind(null, top.game.name)} src={top.game.box.small}/>
                            </td>
                            <td style={game} colSpan='2'>
                                {top.game.name}
                            </td>
                        </tr>
                        <tr>
                            <td style={channels}>
                                <img style={icon} src='assets/streamer_icon.png' />
                                {top.channels}
                            </td>
                            <td style={viewers}>
                                <img style={icon} src='assets/live_viewer_icon.png' />
                                {top.viewers}
                            </td>
                        </tr>
                    </tbody>
                );
            }.bind(this));
        }

        var flex_button_area = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
        };

        var prev_button = {
            visibility: this.state.visibility_prev,
        }

        return (
            <div>
                <div style={flex_button_area}>
                    <button style={prev_button} onClick={this.showPrevHandle}>Prev</button>
                    <button onClick={this.showHideHandle}>Show/Hide Games</button>
                    <button onClick={this.showNextHandle}>Next</button>
                </div>

                <table style={table}>
                    {listView}
                </table>
            </div>
        );
    }
});
