var $ = require('jquery');
var GLOBALS = require('../GLOBALS.js');

class HitboxPlayer {
    constructor(div_id, width=480, height=320) {
        this.options = {
            width: width,
            height: height,
            channel: "{CHANNEL}",
            //video: "{VIDEO_ID}"
        };
        this.current_channel = '';
        this.div_id = div_id;
        this.player_div_id = 'hitbox_player';
    };

    setWidth(width) {
        this.options.width = width;
        $('#' + this.div_id).find('iframe').css('width', width);
    };

    setHeight(height) {
        this.options.height = height;
        $('#' + this.div_id).find('iframe').css('height', height);
    };
    
    setChannel(channel) {
        this.current_channel = channel;
        console.log('watching ' + channel + ' on Hitbox!');
    };

    getDivId() {
        return(this.div_id);
    };

    loadVideoPlayer() {
        
        var src = 'https://www.hitbox.tv/#!/embed/{CHANNEL}?autoplay=true'.format({
			CHANNEL: this.current_channel});

		var html =    ['<iframe ', 
                        'width="{w}" '.format({ w: this.options.width}),
						'height="{h}" '.format({ h: this.options.height }),
						'id="{div_id}" '.format({ div_id: this.player_div_id}),
						'src="{src}" '.format({ src: src }),
						'frameborder="0" ',
						'>',
                        '</iframe>'
                        ].join('');

        $('#' + this.div_id).html(html);

    };

    removeIframeVideo() {
        var iframe = $('#' + this.player_div_id).get(0);
        if (iframe) {
            iframe.parentNode.removeChild(iframe);
        }
    };

}

module.exports = HitboxPlayer;
