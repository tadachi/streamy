var React = require('react');
var TwitchAPI = require('../../api_wrappers/twitch-api.js');

var SelectorForTwitchGames = React.createClass({

    twitch: new TwitchAPI(),

    getDefaultProps: function() {
        return {
            data: '',
            display: ''
        };
    },

    render: function() {
        var listView;

        var table = {
            display: this.props.display,
            width: 'inherit',
            height: 'inherit',
            margin: '0px',
            border: '0px',
            padding: '0px',
            fontSize: '10px',
        };

        var tbody = {
            // border: '1px solid #ccc'
        };

        var logo = {
            // border: '3px solid #FF9933', // ~ Orange-legendary color from D3
            // width: '52px',
            // height: '72px',
            // opacity: '0.55',
        };

        var icon = {
            maxWidth: '50px',
            marginRight: '5px',
            marginLeft: '5px',
            width: '20px',
            height: '20px',
            verticalAlign: 'middle',
        };

        var image = {
            // opacity: '0.55',
        }

        var game_name = {
            fontFamily: 'Droid Sans, serif',
            width: '248px',
            paddingLeft: '5px',
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#FF9933',

            // border: '1px solid black',
        };

        var channels = {
            fontFamily: 'Droid Sans, serif',
            fontSize: '17px',
            fontWeight: 'bold',
            textAlign: 'left',

            color: 'white',

            // border: '1px solid black',
        };

        var viewers = {
            fontFamily: 'Droid Sans, serif',
            fontSize: '17px',
            fontWeight: 'bold',
            textAlign: 'left',

            color: 'white',

            // border: '1px solid black',
        };

        // console.log(this.props.data);
        if (this.props.data) {
                // {top.game.name} {top.viewers} {top.channels} {top.game.box.large} {top.game.box.medium} {top.game.box.small}
                if (this.props.data.top) {
                    listView = this.props.data.top.map(function(top, i) {
                        return (
                            <tbody style={tbody} key={i} >
                                <tr>
                                    <td rowSpan='2'>
                                        <img style={image} onClick={this.props.selectGame.bind(null, top.game.name)} src={top.game.box.small}/>
                                    </td>
                                    <td style={game_name} colSpan='2'>
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
                } else if (this.props.data.games) {
                    listView = this.props.data.games.map(function(game, i) {
                        return (
                            <tbody style={tbody} key={i} >
                                <tr>
                                    <td>
                                        <img style={image} onClick={this.props.selectGame.bind(null, game.name)} src={game.box.small}/>
                                    </td>
                                    <td style={game_name}>
                                        {game.name}
                                    </td>
                                </tr>
                            </tbody>
                        );
                    }.bind(this));
                }
            }

        return (
            <div>
                <table style={table}>
                    {listView}
                </table>
            </div>
        );
    }
});

module.exports = SelectorForTwitchGames;
