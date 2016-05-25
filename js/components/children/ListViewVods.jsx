var React = require('react');
var SmallTwitchComponents = require('./SmallTwitchComponents.jsx')

var ListViewVods = React.createClass({
    getDefaultProps: function() {
        return {
            data: '',
            display: '',
        };
    },

    getInitialState: function() {
        return {
            data: null,
        };
    },
    
    render: function() {
        let listView;
        var data = this.props.data;
        
        // CSS Inline Styles
        var table = {
            display: this.props.display,
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
            // opacity: '0.55',
        }
        
        var name = {
            padding: '0px',

            overflow: 'hidden',
            fontFamily: 'Droid Sans, serif',
        	fontSize: '10px',
            fontWeight: 'bold',
            color: '#8A2BE2', /*~ purplish*/

            paddingLeft: '5px',

            width: '170px',
            maxWidth: '170px',
            // verticalAlign: 'center',
            // textAlign: 'left',

            // border: '1px solid black',
        };
        
        if (data) {
            //data.display_name data.logo data.updated_at
            console.log(data);
            
            if (data._total <= 0) {
                return (
                    <table style={table}>
                        {listView}
                    </table>
                );
            } 
            
            // Twitch
            if (data.channels) { 
                listView = data.channels.map(function(stream, i) {
                    return (
                        <tbody style={tbody} key={i}>
                            <tr>
                                <td style={logo} rowSpan="3" >
                                    <SmallTwitchComponents.UserLogo
                                        style={image}
                                        src={stream.logo}
                                        />
                                </td>
                                <td style={name}>{stream.name}</td>
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

module.exports = ListViewVods;