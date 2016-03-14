var React = require('react');
var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

var TwitchChat = React.createClass({

    getInitialState: function() {
        return {
            channel: '{CHANNEL}',
            width: '300',
            height: window.innerHeight - GLOBALS.MAGIC_MARGIN,
            error_display: '',
            load_chat_button_display: 'none',
            flex_div_display: '',
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
        this.setState({load_chat_button_display: ''});
        this.setState({channel: channel});
        this.removeIframeChat();
    },

    loadChat: function() {
        this.setState({flex_div: 'none'});

        // Change the chat to the corresponding video channel.
        var src = 'http://www.twitch.tv/{CHANNEL}/chat'.format({
            CHANNEL: this.state.channel});

        var html =    ['<iframe ',
                        'id="{div_id}" '.format({div_id: this.props.div_id}),
                        'frameborder="0" ',
                        'scrolling="yes" ',
                        'src="{src}" '.format({src: src}),
                        'width="{w}" '.format({w: this.state.width}),
                        'height="{h}">'.format({h: this.state.height}),
                    '</iframe>'].join("");

        $('#' + this.props.parent_div_id).prepend(html);
    },

    componentDidMount: function() {},

    removeIframeChat: function() {
        var iframe = $('#' + this.props.div_id).get(0);
        if (iframe) {
            iframe.parentNode.removeChild(iframe);
        }

        this.setState({flex_div_display: ''});
        this.setState({flex_div: ''});
    },

    render: function() {
        var div = {
            display: this.state.flex_div,
            width: '300px',
            height: this.state.height,
        }

        var flex_div = {
            display: this.state.flex_div,

            width: '300px',
            height: this.state.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        var button = {
            display: this.state.load_chat_button_display,
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
                    <button style={button} onClick={this.loadChat}>Load chat for {this.state.channel}</button>
                </div>
            </div>
        );

    }

});

module.exports = TwitchChat;
