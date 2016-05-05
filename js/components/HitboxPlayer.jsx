var React = require('react');
var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

/**
 * Hitbox player component.
 */
var HitboxPlayer = React.createClass({

    getInitialState: function() {
        return {
            width: 480,
            height: 320,
            channel: null,
        };
    },

    setWidth: function(width) {
        $('#' + this.props.iframe_div_id).css('width', width);
    },

    setHeight: function(height) {
        $('#' + this.props.iframe_div_id).css('height', height);
    },

    setChannel: function(channel) {
        this.setState({channel: channel});
        this.removeIframeVideo();
        this.loadVideoPlayer();
    },

    loadVideoPlayer: function() {
        console.log('loadplayer');

        var src = 'https://www.hitbox.tv/#!/embed/{CHANNEL}?autoplay=true'.format({
			CHANNEL: this.state.channel});

		var html =    ['<iframe width="{w}" '.format({ w: this.state.width}),
						'height="{h}" '.format({ h: this.state.height }),
						'id={iframe_div_id}'.format({ iframe_div_id: this.props.iframe_div_id}),
						'src="{src}" '.format({ src: src }),
						'frameborder="0 ',
						'allowfullscreen',
						'>',
					'</iframe>'
					].join('');

        $('#' + this.props.parent_div_id).prepend(html);

    },

    removeIframeVideo: function() {
        var iframe = $('#' + this.props.div_id).get(0);
        if (iframe) {
            iframe.parentNode.removeChild(iframe);
        }
    },

    render: function() {
         return (
            <div></div>
        );       
    },

});

module.exports = HitboxPlayer;