var ListViewTwitchStreams = React.createClass({

    getDefaultProps: function() {
        return {
            data: ''
        };
    },

    getInitialState: function () {
        return { user_default_icon: '', display: 'none' };
    },

    handleMouseOver: function(index) {
        this.refs[index].showPreview();
    },

    handleMouseOut: function(index) {
        this.refs[index].hidePreview();
    },

    render: function() {
        var listView;

        // CSS inline styles
        var list = {
            width: '200px',
            display: 'block',
            padding: '10px',
            border: '1px solid black',
            fontWeight: 'bold'
        };

        var table = {
            width: '200px',
            margin: '0px',
            border: '0px',
            padding: '0px'
        };

        var logo = {
            padding: '5px'
        };

        var name = {
            padding: '5px',
        	fontSize: '18px',
            fontWeight: 'bold',
            color: '#000066' /*~ darkgreen */
        };

        var viewers = {
            padding: '5px',
            fontSize: '14px',
            color: 'red',
            textAlign: 'right'
        };

        var status = {
            paddingLeft: '5px',
            maxWidth: '50px', /* To clip text with an ellipsis when it overflows a table cell */
        	fontSize: '14px',
        	color: 'black',

            overflow: 'hidden',
            whiteSpace: 'nowrap',
        };

        //{stream.channel.name} {stream.channel.status} {stream.channel.logo} {stream.game} {stream.viewers} {stream.preview.small}
        // console.log(this.props.data);
        if (this.props.data) {
            listView = this.props.data.streams.map(function(stream, i) {
                return (
                    <tbody style={table} key={i}>
                        <tr>
                            <td style={logo} rowSpan="2">
                                <TwitchUserLogo src={stream.channel.logo}/>
                            </td>
                            <td style={name}>{stream.channel.name}</td>
                            <td style={viewers}>{stream.viewers}</td>
                        </tr>
                        <tr>
                            <td style={status}>{stream.channel.status}</td>
                            <td></td>
                        </tr>
                    </tbody>
                );
            }.bind(this));
        }

        return (
            <div>
                <table>
                    {listView}
                </table>
            </div>
        );

    }

});
