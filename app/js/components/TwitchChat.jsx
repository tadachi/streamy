reloadTwitchChat = function(div_id, width=300, height=500, channel) {
    // Change the chat to the corresponding video channel.
    var src = 'http://www.twitch.tv/{CHANNEL}/chat'.format({
        CHANNEL: channel});

    http://www.twitch.tv/{CHANNEL}/chat

    var html =    ['<iframe ',
                    'id="chat" ',
                    'frameborder="0" ',
                    'scrolling="yes" ',
                    'src="{src}" '.format({src: src}),
                    'width="{w}" '.format({w: width}),
                    'height="{h}">'.format({h: height}),
                '</iframe>'].join("");

    $('#' + div_id).html(html);
}
