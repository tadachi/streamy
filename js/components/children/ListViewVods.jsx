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
            if (this.props.data._total <= 0) {
                return (
                    <table style={table}>
                        {listView}
                    </table>
                );
            } 
            
            //data.display_name data.logo data.updated_at
            console.log(this.props.data);
        } 
    }
    
});