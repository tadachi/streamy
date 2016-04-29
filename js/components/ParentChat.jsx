var React = require('react');
var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

var ParentChat = React.createClass({

    getInitialState: function() {
        return {
            width: null,
            height: null,
            channel: null,
        };
    },
    
    render: function() {
        var div = {
            display: 'flex',
        };

        return (
            <div style={div}>
            </div>
        );

    }
        
})

module.exports = ParentChat;