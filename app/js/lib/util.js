/* Similar to what you find in Java's format. */
/* Usage: chatsrc = 'http://twitch.tv/chat/embed?channel={channel}&amp;popout_chat=true'.format({ channel: streamer}); */
if (!String.prototype.format) {
    String.prototype.format = function() {
        var str = this.toString();

        if (!arguments.length) {
            return str;
        }

        var args = typeof(arguments[0]);
        args = ('string' == args || 'number' == args) ? arguments : arguments[0];

        for (var arg in args) {
            str = str.replace(RegExp('\\{' + arg + '\\}', 'gi'), args[arg]);
        }

        return str;
    };
}

function log(message){ return function(x){
    return console.log(message, x);
};};
