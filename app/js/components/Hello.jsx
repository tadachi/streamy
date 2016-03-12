var React = require('react');


var Hello = React.createClass({
    render: function() {
        return (
            <div>Hello {this.props.name}</div>
        );
    }
});

// Export on bottom to avoid invariant errors from React.
module.exports = Hello;
