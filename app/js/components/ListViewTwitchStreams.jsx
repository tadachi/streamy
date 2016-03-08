var ListViewTwitchStreams = React.createClass({

    getDefaultProps: function() {
        return {
            data: '',
        };
    },

    getInitialState: function () {
        return {
            user_default_icon: '',
            display: 'none',
        };
    },

    debugHandle1: function() {
        console.log('test');
    },

    handleMouseOver: function(index) {
        this.refs[index].showPreview();
    },

    handleMouseOut: function(index) {
        this.refs[index].hidePreview();
    },

    componentDidMount: function() {
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
            width: '53px',
            height: '53px',

            margin: '0px',
            padding: '0px',

            // opacity: '0.7',

            verticalAlign: 'center',
            textAlign: 'center',

            border: '1px solid black',
        };

        var highlight = {
            opacity: '1',
        };

        var name = {
            padding: '0px',

            overflow: 'hidden',
            fontFamily: 'Droid Sans, serif',
        	fontSize: '16px',
            fontWeight: 'bold',
            color: '#4d79ff', /*~ lightish blue*/

            paddingLeft: '5px',

            width: '170px',
            maxWidth: '170px',
            // verticalAlign: 'center',
            // textAlign: 'left',

            border: '1px solid black',
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

            border: '1px solid black',
        };

        var game = {
            fontFamily: 'Droid Sans, serif',
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'white',

            paddingLeft: '5px',
            textOverflow: 'ellipsis',

            border: '1px solid black',
        }

        var status = {
            fontFamily: 'Droid Sans, serif',
        	fontSize: '14px',
        	color: 'white',

            width: '170px',
            maxWidth: '170px',

            paddingLeft: '5px',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',

            verticalAlign: 'top',
            textAlign: 'left',

            border: '1px solid black',
        };

        //{stream.channel.name} {stream.channel.status} {stream.channel.logo} {stream.game} {stream.viewers} {stream.preview.small}
        // console.log(this.props.data);
        if (this.props.data) {
            console.log(this.props.data);
            if (this.props.data.streams) {
                listView = this.props.data.streams.map(function(stream, i) {
                    return (
                        <tbody style={tbody} key={i}>
                            <tr>
                                <td style={logo} onClick={this.props.setChannel.bind(null, stream.channel.name)}  rowSpan="3" >
                                    <TwitchUserLogo src={stream.channel.logo} />
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

        }

        return (
            <table style={table}>
                {listView}
            </table>
        );

    }

});
