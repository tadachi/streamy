var TwitchVideoPlayer = React.createClass({

    getInitialState: function() {
        return {
            width: $('#flex_search').width(),
            height: window.innerHeight - MAGIC_MARGIN,
            channel: '{CHANNEL}',
        };
    },

    setChannel: function(channel) {
        this.setState({channel: channel});
    },

    setWidth: function(width) {
        $('#' + this.props.div_id).css('width', width);
    },

    setHeight: function(height) {
        $('#' + this.props.div_id).css('height', height);
    },

    componentDidMount: function() {
    },

    removeIframeChat: function() {
        var iframe = $('#video').get(0);
        iframe.parentNode.removeChild(iframe);

        this.setState({flex_div_display: ''});
    },

    render: function() {
        return (
            <iframe
               id={this.props.div_id}
               src={"http://player.twitch.tv/?channel="+this.state.channel}
               height={this.state.width}
               width={this.state.height}
               frameBorder="0"
               scrolling="no"
               allowFullScreen="true">
           </iframe>
        );

    }

});
