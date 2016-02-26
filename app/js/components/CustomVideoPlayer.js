var CustomVideoPlayer = React.createClass({

    getInitialState: function() {

        return {value: '90'};
    },

    handleChange: function(event) {
        this.setState({value: event.target.value});
    },

    render: function() {
        return (
            <div>
            <input onChange={this.handleChange} type="range" value={this.state.value} />
            <b>{this.state.value}</b>
            </div>
        );
    }
});
