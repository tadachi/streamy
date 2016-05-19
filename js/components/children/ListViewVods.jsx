var React = require('react');

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
        let data = this.props.data;
        
        if (data) {
            //data.display_name data.logo data.updated_at
            console.log(this.props.data);
        }
    }
    
});