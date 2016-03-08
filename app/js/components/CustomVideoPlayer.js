class CustomTwitchPlayer {

    constructor(div_id, width=480, height=320) {
        this.options = {
            width: width,
            height: height,
            channel: '{CHANNEL}',
            //video: "{VIDEO_ID}"
        };
        this.div_id = div_id;
        // this.player = new Twitch.Player(this.div_id, this.options);
    }

    pause() {
        this.player.pause();
        console.log('player paused');
    }

    setChannel(channel) {
        this.player.setChannel(channel);
        console.log('watching ' + channel);
    }

    getDivId() {
        return(this.div_id);
    }

    toString() {
        console.log(this.options);
        console.log(this.div_id);
        console.log(this.player);
    }

}
