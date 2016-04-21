var React = require('react');
var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

var HitboxChat = React.createClass({
    getInitialState: function() {
        return {
            width: null,
            height: null,
            channel: null,
            error_display: '',
        };
    },
    
    setWidth: function(width) {
        $('#' + this.props.div_id).css('width', width);
    },

    setHeight: function(height) {
        $('#' + this.props.div_id).css('height', height);
    },

    setChatChannel: function(channel) {
        this.setState({error_display: 'none'});
        this.removeIframeChat();
    },    
    
    loadChat: function() {

        // Change the chat to the corresponding video channel.
        var src = 'https://www.twitch.tv/{CHANNEL}/chat'.format({
            CHANNEL: this.state.channel});

		var html =    ['<iframe ',
						'id="chat" ',
						'frameborder="0" ',
						'scrolling="yes" ',
                        'src="{src}" '.format({src: src}),
                        'width="{w}" '.format({w: this.state.width}),
                        'height="{h}">'.format({h: this.state.height}),
					'</iframe>'].join("");

        $('#' + this.props.parent_div_id).prepend(html);

    },
    
    removeIframeChat: function() {
        var iframe = $('#' + this.props.div_id).get(0);
        if (iframe) {
            iframe.parentNode.removeChild(iframe);
        }
    },
 
    render: function() {
        var div = {
            display: 'flex',
            width: '300px',
            height: this.state.height,
        };

        var flex_div = {
            display: 'flex',

            width: '300px',
            height: this.state.height,
            alignItems: 'center',
            justifyContent: 'center',
        };

        var error = {
            display: this.state.error_display,

            fontFamily: 'Droid Sans, serif',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#6666FF', // ~ Diablo 3 Magic Item Blue
        };

        return (
            <div style={div}>
                <div style={flex_div}>
                    <p style={error}>No stream has been loaded.</p>
                </div>
            </div>
        );

    }
    
});

module.exports = HitboxChat;