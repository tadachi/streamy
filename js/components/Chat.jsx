var React = require('react');
var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

/**
 * Chat component.
 */
var Chat = React.createClass({

    propTypes: {
        parent_div_id: React.PropTypes.string.isRequired,
        iframe_div_id: React.PropTypes.string.isRequired,
    },

    getInitialState: function() {
        return {
            channel: '{CHANNEL}',
            width: '300',
            height: window.innerHeight,
            error_display: '',
            load_chat_button_display: 'none',
            flex_div_display: 'flex',
        };
    },

    setWidth: function(width) {

        $('#' + this.props.iframe_div_id).css('width', width);
    },

    setHeight: function(height) {
        this.setState({height: height});
        $('#' + this.props.iframe_div_id).css('height', height);
    },

    setChatChannel: function(channel) {
        this.setState({error_display: 'none'});
        this.setState({load_chat_button_display: ''});
        this.setState({channel: channel});
        this.removeIframeChat();
    },

    loadTwitchChat: function() {

        // Change the chat to the corresponding video channel.
        var src = 'https://www.twitch.tv/{CHANNEL}/chat'.format({
            CHANNEL: this.state.channel});

        var html =    ['<iframe ',
                        'id="{iframe_div_id}" '.format({iframe_div_id: this.props.iframe_div_id}),
                        'frameborder="0" ',
                        'scrolling="yes" ',
                        'src="{src}" '.format({src: src}),
                        'width="{w}" '.format({w: this.state.width}),
                        'height="{h}">'.format({h: this.state.height}),
                    '</iframe>'].join("");

        $('#' + this.props.parent_div_id).prepend(html);

    },

    loadHitboxChat: function() {
        
        var src = 'src="https://www.hitbox.tv/embedchat/{CHANNEL}" '.format({ 
            CHANNEL: this.state.channel });
        
        var html =  ["<iframe ".format({ w: this.state.width }),
            'id="{iframe_div_id}" '.format({iframe_div_id: this.props.iframe_div_id}),
            'frameborder="0" ',
            'width="{w}" '.format({w: this.state.width}),
            'height="{h} '.format({ h: this.state.height }),
            'src="{src}" '.format({src: src}),
            'allowfullscreen>',
            "</iframe>"
        ].join("");

        $('#' + this.props.parent_div_id).prepend(html);
    },

    componentDidMount: function() {
    },

    removeIframeChat: function() {
        var iframe = $('#' + this.props.iframe_div_id).get(0);
        if (iframe) {
            iframe.parentNode.removeChild(iframe);
        }
    },

    render: function() {
        var div = {
            display: this.state.flex_div_display,
            width: '300px',
            height: this.state.height,
        }

        var flex_div = {
            display: this.state.flex_div_display,

            width: '300px',
            height: this.state.height,
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
            <div style={flex_div}>
                <p style={error}>No stream has been loaded.</p>
                <button style={button} onClick={this.loadTwitchChat}>Load chat for {this.state.channel}</button>
            </div>
        );

    }

});

module.exports = Chat;
