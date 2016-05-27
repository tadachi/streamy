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
            data: '',
        };
    },
    
    // Pass this into array.sort().
    sortByViews: function(a, b) {
        if (a.views < b.views) {
            return 1;
        } else if (a.views > b.views) {
            return -1;
        } else {
            return 0;
        }
    },
    
    // Pass this into array.sort().
    sortByFollowers: function(a, b) {
        if (a.Followers < b.Followers) {
            return 1;
        } else if (a.Followers > b.Followers) {
            return -1;
        } else {
            return 0;
        }
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
            maxheight: '200px',
            // opacity: '0.55',
        }
        
        var name = {
            padding: '0px',

            overflow: 'hidden',
            fontFamily: 'Droid Sans, serif',
        	fontSize: '15px',
            fontWeight: 'bold',
            color: '#83e22b', /*~ green*/

            paddingLeft: '5px',

            width: '170px',
            maxWidth: '170px',
            // verticalAlign: 'center',
            // textAlign: 'left',

            // border: '1px solid black',
        };
        
        var test = {
            maxWidth: '170px',
            paddingLeft: '5px',
            fontSize: '12px',
            color: 'white',
        }
        
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
            
            let sorted_streamers = data.channels.sort(this.sortByViews);
            
            // Twitch
            if (data.channels) { 
                listView = sorted_streamers.map(function(stream, i) {
                    return (
                        <tbody style={tbody} key={i}>
                            <tr>
                                <td style={logo} rowSpan="8">
                                    <SmallTwitchComponents.UserLogo
                                        style={image}
                                        src={stream.logo}
                                        />
                                </td>
                            </tr>
                            <tr>
                                <td style={name}>{stream.name}</td>
                            </tr>
                            {stream.game ? 
                                <tr><td style={test}>{stream.game}</td></tr> : null}
                            
                            {stream.status ? 
                                <tr><td style={test}>{stream.status}</td></tr> : null}
                            <tr>
                                <td style={test}>Last: {stream.updated_at}</td>
                            </tr>
                            <tr>
                                <td style={test}>Followers: {stream.followers}</td>
                            </tr>
                            <tr>
                                <td style={test}>Views: {stream.views}</td>
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