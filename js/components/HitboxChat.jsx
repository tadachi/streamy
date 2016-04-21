var HitboxChat = React.createClass({
    getInitialState: function() {
        return {
            width: null,
            height: null,
            channel: null,
        };
    },
    
    setWidth: function(width) {
        $('#' + this.props.div_id).css('width', width);
    },

    setHeight: function(height) {
        $('#' + this.props.div_id).css('height', height);
    },

    setChatChannel: function(channel) {
        this.removeIframeChat();
    },    
    
    loadChat: function() {
        this.setState({flex_div: 'none'});

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
    
});

module.exports = HitboxChat;