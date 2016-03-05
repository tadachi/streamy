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

    handle1: function(i) {
        console.log(i);
    },

    handleMouseOver: function(index) {
        this.refs[index].showPreview();
    },

    handleMouseOut: function(index) {
        this.refs[index].hidePreview();
    },

    render: function() {
        var listView;

        // CSS Inline Styles
        var table = {
            width: '99%',
            height: '35px',
            margin: '0px',
            border: '0px',
            padding: '0px',
            // border: '1px solid black',
        };

        var tbody = {
            width: '99%',
            margin: '0px',
            padding: '0px',

            // border: '1px solid black',
            // display: 'inline-block',
            // borderRadius: '1px',
        }

        var logo = {
            width: '70px',
            height: '70px',

            margin: '0px',
            padding: '0px',

            opacity: '0.7',

            verticalAlign: 'center',
            textAlign: 'center',

            // border: '1px solid black',
        };

        var highlight = {
            opacity: '1',
        };

        var name = {
            width: '100px',
            padding: '0px',

            fontFamily: 'Droid Sans, serif',
        	fontSize: '21px',
            fontWeight: 'bold',
            color: '#000066', /*~ darkgreen */

            paddingLeft: '5px',

            verticalAlign: 'top',
            textAlign: 'left',

            // border: '1px solid black',
        };

        var viewers = {
            maxWidth: '35px',

            fontSize: '18px',
            fontWeight: 'bold',
            color: 'red',

            verticalAlign: 'top',
            textAlign: 'right',

            // border: '1px solid black',
        };

        var status = {
            width: '150px',

            fontFamily: 'Droid Sans, serif',
        	fontSize: '14px',
        	color: 'white',

            paddingLeft: '5px',
            overflow: '',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',

            verticalAlign: 'top',
            textAlign: 'left',

            // border: '1px solid black',
        };

        //{stream.channel.name} {stream.channel.status} {stream.channel.logo} {stream.game} {stream.viewers} {stream.preview.small}
        // console.log(this.props.data);

        var test = 'www.google.ca';

        if (this.props.data) {
            listView = this.props.data.streams.map(function(stream, i) {
                return (
                    <tbody style={tbody} key={i}>
                        <tr>
                            <td style={logo} rowSpan="2" >
                                <TwitchUserLogo src={stream.channel.logo} onMouseMove={this.handle1.bind(this,i)}/>
                            </td>
                            <td style={name}>{stream.channel.name}</td>
                            <td style={viewers}>{stream.viewers}</td>
                        </tr>
                        <tr>
                            <td style={status} colSpan="2">{stream.channel.status}</td>
                            {/*<td style={status} colSpan="2">{console.log(linkifyStr(stream.channel.status))}</td>*/}
                            {/*<td style={status} colSpan="2">{linkifyHtml(stream.channel.status)}</td>*/}
                            {/*<td style={status} colSpan="2">Test<a class="linkified" href={test}>www.google.ca</a></td>*/}
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
