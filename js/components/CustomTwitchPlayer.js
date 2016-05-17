var $ = require('jquery');

/**
 * The Twitch videoplayer component. It is using the interactive embed code.
 */
class CustomTwitchPlayer {

    constructor(div_id, width=480, height=320) {
        this.options = {
            width: width,
            height: height,
            channel: "{CHANNEL}",
            //video: "{VIDEO_ID}"
        };
        this.current_channel = '';
        this.div_id = div_id;
        // this.player = new Twitch.Player(this.div_id, this.options);
    };

    pause() {
        this.player.pause();
        console.log('player paused');
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
        // this.player.setChannel(channel);
        console.log('watching ' + channel + ' on Twitch!');
    };

    getDivId() {
        return(this.div_id);
    };

    toString() {
        console.log(this.options);
        console.log(this.div_id);
        console.log(this.player);
    };

    clear() {
        $('#' + this.div_id).empty();
        this.player = null;
    }

    reInitialize() {
        if (!this.player) 
            this.player = new Twitch.Player(this.div_id, this.options); 
    }

}

module.exports = CustomTwitchPlayer;
