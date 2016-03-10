var TwitchChat = React.createClass({

    getInitialState: function() {
        return {
            channel: '{CHANNEL}',
            width: '300',
            height: window.innerHeight - MAGIC_MARGIN,
            error_display: '',
            load_chat_button_display: 'none',
            flex_div_display: '',
            chat_display: '',
        };
    },

    src: 'http://www.twitch.tv/destiny/chat',

    setChatChannel: function(channel) {
        this.setState({error_display: 'none'});
        this.setState({load_chat_button_display: ''});
        this.setState({channel: channel});
        this.removeIframeChat();
    },

    loadChat: function() {
        // Change the chat to the corresponding video channel.
        var src = 'http://www.twitch.tv/{CHANNEL}/chat'.format({
            CHANNEL: this.state.channel});

        var html =    ['<iframe ',
                        'id="chat" ',
                        'frameborder="0" ',
                        'scrolling="yes" ',
                        'src="{src}" '.format({src: src}),
                        'width="{w}" '.format({w: this.state.width}),
                        'height="{h}">'.format({h: this.state.height}),
                    '</iframe>'].join("");

        $('#' + this.props.div_id).prepend(html);
    },

    componentDidMount: function() {
        // console.log($('#chat'));
    },

    removeIframeChat: function() {
        var iframe = $('#chat').get(0);
        iframe.parentNode.removeChild(iframe);

        this.setState({flex_div_display: ''});
    },

    render: function() {
        var div = {
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
            // maxWidth: '50%',
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
                    <p style={error}>No Stream has been loaded</p>
                    <button style={button} onClick={this.loadChat}>Load chat for {this.state.channel}</button>
                </div>
            </div>
        );

    }

});
