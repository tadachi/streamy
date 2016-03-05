class CustomTwitchPlayer {

    constructor(div_id) {
        this.options = {
            width: 480,
            height: 320,
            channel: "",
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

}
