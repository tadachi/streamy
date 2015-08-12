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

// React.render(
//     <h1>Hello, world!!!</h1>,
//     document.getElementById('example')
// );

var streamername = 'bowiethehero';
var chatsrc = 'http://twitch.tv/chat/embed?channel={ch}&amp;popout_chat=true'.format({ch: streamername});

// var chat =    [ '<iframe ',
//         'id=\'_{name}\' '.format({ name: stream.streamname}),
//         'frameborder=\'0\' ',
//         'scrolling=\'yes\' ',
//         'src=\'{url}\' '.format({url: chatsrc}),
//         'width=\'{w}\' '.format({w: width-40}),
//         'height=\'{h}\' '.format({h: height-40}),
//         '> ',
//     '</iframe>'].join('');


var ChatScreen = React.createClass({
    render: function() {
        return (
            <iframe
            scrolling='no'
            src='http://twitch.tv/chat/embed?channel=theclaude&amp;popout_chat=true'
            height='500'
            width='350'>
            </iframe>
        );
    }

});

React.render(
        <ChatScreen />,
        document.getElementById('example')
);
