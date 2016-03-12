var React = require('react');
var SmallTwitchComponents = require('./SmallTwitchComponents.jsx')

var ListViewTwitchStreams = React.createClass({

    getDefaultProps: function() {
        return {
            data: '',
        };
    },

    render: function() {
        var listView;

        // CSS Inline Styles
        var table = {
            width: 'inherit',
            margin: '0px',
            border: '0px',
            padding: '0px',
            // border: '1px solid black',
        };

        var tbody = {
            margin: '0px',
            padding: '0px',

            // border: '1px solid black',
            // display: 'inline-block',
            // borderRadius: '1px',
        }

        var logo = {
            margin: '0px',
            padding: '0px',

            // opacity: '0.7',

            verticalAlign: 'center',
            textAlign: 'center',

            // border: '1px solid black',
        };

        var image = {
            width: '53px',
            height: '53px',
            opacity: '0.55',
        }

        var highlight = {
            opacity: '1',
        };

        var name = {
            padding: '0px',

            overflow: 'hidden',
            fontFamily: 'Droid Sans, serif',
        	fontSize: '18px',
            fontWeight: 'bold',
            color: '#8A2BE2', /*~ purplish*/

            paddingLeft: '5px',

            width: '170px',
            maxWidth: '170px',
            // verticalAlign: 'center',
            // textAlign: 'left',

            // border: '1px solid black',
        };

        var viewers = {
            fontFamily: 'Droid Sans, serif',
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'red',

            width: '70px',
            maxWidth: '70px',
            verticalAlign: 'top',
            textAlign: 'right',

            // border: '1px solid black',
        };

        var game = {
            fontFamily: 'Droid Sans, serif',
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'white',

            paddingLeft: '5px',
            textOverflow: 'ellipsis',

            // border: '1px solid black',
        }

        var status = {
            fontFamily: 'Droid Sans, serif',
        	fontSize: '14px',
        	color: 'white',

            width: '170px',
            maxWidth: '170px',

            paddingLeft: '5px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',

            verticalAlign: 'top',
            textAlign: 'left',

            // border: '1px solid black',
        };

        //{stream.channel.name} {stream.channel.status} {stream.channel.logo} {stream.game} {stream.viewers} {stream.preview.small}
        // console.log(this.props.data);
        if (this.props.data) {
            // From Twitch
            if (this.props.data.streams) {
                // Sort streams by viewers before processing
                listView = this.props.data.streams.map(function(stream, i) {
                    return (
                        <tbody style={tbody} key={i}>
                            <tr>
                                <td style={logo} rowSpan="3" >
                                    <a href={window.location.pathname + "#/!/?streamer="+stream.channel.name}
                                        onClick={this.props.setChannel.bind(null, stream.channel.name)}>
                                        <SmallTwitchComponents.TwitchUserLogo
                                            style={image}
                                            src={stream.channel.logo}
                                            />
                                    </a>
                                </td>
                                <td style={name}>{stream.channel.name}</td>
                                <td style={viewers}>{stream.viewers}</td>
                            </tr>
                            <tr>
                                <td style={game}>{stream.game}</td>
                            </tr>
                            <tr>
                                <td style={status}>{stream.channel.status}</td>
                                {/*<td style={status} colSpan="2">{console.log(linkifyStr(stream.channel.status))}</td>*/}
                                {/*<td style={status} colSpan="2">{linkifyHtml(stream.channel.status)}</td>*/}
                                {/*<td style={status} colSpan="2">Test<a class="linkified" href={test}>www.google.ca</a></td>*/}
                            </tr>
                        </tbody>
                    );
                }.bind(this));
            }
            // From SpeedRunsLive
            else if (this.props.data._source) {
                // Sorted top viewers to bottom descending
                var compare = function(a, b) {
                    //a.current_viewers b.current_viewers
                    if (a.current_viewers < b.current_viewers) {
                        return 1;
                    } else if (a.current_viewers > b.current_viewers) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
                var array = this.props.data._source.channels.sort(compare)

                // {stream.image.size70} {stream.display_name} {stream.api} {stream.current_viewers}  {stream.meta_game} {stream.title}
                listView = array.map(function(stream, i) {
                    return (
                        <tbody style={tbody} key={i}>
                            <tr>
                                <td style={logo} rowSpan="3" >
                                    <a href={window.location.pathname  + '#/!/?streamer='+stream.display_name}
                                        onClick={this.props.setChannel.bind(null, stream.display_name)}>
                                        <SmallTwitchComponents.TwitchUserLogo
                                             style={image}
                                             src={stream.image.size70}
                                             />
                                    </a>
                                </td>
                                <td style={name}>{stream.display_name}</td>
                                <td style={viewers}>{stream.current_viewers}</td>
                            </tr>
                            <tr>
                                <td style={game}>{stream.meta_game}</td>
                            </tr>
                            <tr>
                                <td style={status}>{stream.title}</td>
                            </tr>
                        </tbody>
                    );
                }.bind(this));
            }
        }


        return (
            <table style={table}>
                {listView}
            </table>
        );

    }

});

module.exports = ListViewTwitchStreams;
