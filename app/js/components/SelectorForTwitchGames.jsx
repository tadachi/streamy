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
        };

        var tbody = {
            // border: '1px solid #ccc'
        };

        var logo = {
            border: '3px solid #FF9933',
            // width: '52px',
            // height: '72px',
            // opacity: '0.7',
        };

        var icon = {
            maxWidth: '50px',
            marginRight: '5px',
            marginLeft: '5px',
            width: '20px',
            height: '20px',
            verticalAlign: 'middle',
        };

        var game = {
            fontFamily: 'Droid Sans, serif',
            width: '248px',

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

        if (this.props.data) {
            // console.log(this.state.data.top);
            // {top.game.name} {top.viewers} {top.channels} {top.game.box.large} {top.game.box.medium} {top.game.box.small}
            listView = this.props.data.top.map(function(top, i) {
                return (
                    <tbody style={tbody} key={i} >
                        <tr>
                            <td style={logo} rowSpan='2'>
                                <img onClick={this.props.selectGame.bind(null, top.game.name)} src={top.game.box.small}/>
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

        return (
            <div>
                <table style={table}>
                    {listView}
                </table>
            </div>
        );
    }
});
