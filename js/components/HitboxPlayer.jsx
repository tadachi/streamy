var React = require('react');
var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

/**
 * Hitbox player component.
 */
var HitboxPlayer = React.createClass({

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

    setChannel: function(channel) {
        this.setState({channel: channel});
        this.removeIframeChat();
    },

    loadVideoPlayer: function() {
        this.setState({flex_div: 'none'});

        var src = 'https://www.hitbox.tv/#!/embed/{CHANNEL}?autoplay=true'.format({
			CHANNEL: this.state.channel});

		html =    ['<iframe width="{w}" '.format({ w: center.w }),
						'height="{h}" '.format({ h: center.h }),
						'id={div_id}',
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
            <div>

            </div>
        );       
    },

});

module.exports = HitboxPlayer;