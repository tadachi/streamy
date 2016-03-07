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

function Util() {}

/**
 * Parses the URL for querystring params.
 * Example usage:
 * url = "http://dummy.com/?technology=jquery&blog=jquerybyexample".
 * var tech = Util.getQueryStringParams("technology"); //outputs: "jquery"
 * var blog = Util.getQueryStringParams("blog");       //outputs: "jquerybyexample"
 *
 * @param sParam
 * @returns {*}
 */
Util.getQueryStringParams = function(sParam) {
	var sPageURL      = window.location.href;
	var sURLVariables = sPageURL.split("/");
	var querystring = '';
	var key;
	var value;

    // ["http:", "", "beastmachine:4000", "?closewindow=true#access_token=v38uujys1qdhcbtnv77myy8dpnd7f3&scope=channel_read"]
    // console.log(sURLVariables);

	for (i = 0; i < sURLVariables.length; i++) {
		if (sURLVariables[i].substring(0, 1) == "?") { // Found query string.
            //?closewindow=true#access_token=v38uujys1qdhcbtnv77myy8dpnd7f3&scope=channel_read
            // console.log(sURLVariables[i]);
            //?closewindow=true&access_token=v38uujys1qdhcbtnv77myy8dpnd7f3&scope=channel_read #->&
            sURLVariables[i] = sURLVariables[i].replace('#', '&');
            //closewindow=true&access_token=v38uujys1qdhcbtnv77myy8dpnd7f3&scope=channel_read ?->''
            // console.log(sURLVariables[i].substring(1));
            //["closewindow=true#access_token=v38uujys1qdhcbtnv77myy8dpnd7f3", "scope=channel_read"]
			querystring = sURLVariables[i].substring(1).split("&");
		}
	}

    //"closewindow=true#access_token=v38uujys1qdhcbtnv77myy8dpnd7f3", "scope=channel_read"
    // console.log(querystring);

	if (querystring) {
		for (i = 0; i < querystring.length; i++) {
			arr = querystring[i].split("=");
			key = arr[0];
			value = arr[1];

			if (key == sParam) { // key mataches param.
				return value;    // Return match.
			}
		}
	}

	return null;
}

Util.log = function(message){ return function(x){
    return console.log(message, x);
};};
