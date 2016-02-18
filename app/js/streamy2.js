Promise.config({
    // Enable warnings.
    warnings: false,
    // Enable long stack traces.
    longStackTraces: false,
    // Enable cancellation.
    cancellation: true
});

var TwitchStream = React.createClass({
    propTypes: {
        id : React.PropTypes.string.isRequired,
        streamer : React.PropTypes.string.isRequired,
        height : React.PropTypes.number.isRequired,
        width : React.PropTypes.number.isRequired,
    },
    render: function() {
        return (
            <iframe
            id={this.props.id}
            scrolling='yes'
            src={this.props.streamer}
            height={this.props.height}
            width={this.props.width}
            >
            </iframe>
        );
    }
});

var TwitchChat = React.createClass({
    propTypes: {
        id : React.PropTypes.string.isRequired,
        streamer : React.PropTypes.string.isRequired,
        height : React.PropTypes.number.isRequired,
        width : React.PropTypes.number.isRequired,
    },
    render: function() {
        return (
            <iframe
            id={this.props.id}
            scrolling='yes'
            src={this.props.streamer}
            height={this.props.height}
            width={this.props.width}
            >
            </iframe>
        );
    }
});

/*
 * Component for twitch channel search.
 */
var SearchBoxForTwitchChannels = React.createClass({

    twitch: new TwitchAPI(),
    typingDelay: new TypingDelay(),

    getInitialState: function() {
        return {
            state: '...',
            data: '...'
        };
    },

    search: function(query = null) {
        console.log(query);
        if (!query) {
            query = this.refs.searchInput.getDOMNode().value; // this is the search data
        }

        // var query = 'pykn';

        this.twitch.searchForChannel(query, function(response) {
            this.setState({ state: '...'});
            this.setState({ data: response });
        }.bind(this));
    },

    doSearch: function() {
        this.setState({state: 'searching...'});
        this.typingDelay.delayedRun(this.search);
    },

    componentDidMount: function() {
        this.search('pykn');
    },

    render: function() {
        // Inline CSS
        var table_row = {
            width: '200px'
        };

        return (
                <div>
                    <input
                    style={table_row}
                    type="text"
                    ref="searchInput"
                    placeholder="Search Twitch User Name"
                    value={this.props.query}
                    onChange={this.doSearch}
                    />
                {this.state.state}
                <ListViewTwitchChannels data={this.state.data} />
                </div>
        );
    }
});

var ListViewTwitchChannels = React.createClass({

    getInitialState: function () {
        return { user_default_icon: '' };
    },

    render: function() {
        var listView;

        // CSS inline styles
        var td = {
            
        };

        // <li>
        //     {item.name} {item.logo} {item.game} {item.updated_at} {item.status}
        // </li>
        if (this.props.data.channels) {
            listView = this.props.data.channels.map(function(item) {
                return (
                    <tr>
                        <td rowspan="2">
                            <TwitchUserLogo src={item.logo}/>
                            {/*<img style={icon_logo} src={user_default_icon} />*/}
                        </td>
                        <td style={td}>{item.game}</td>
                    </tr>

                );
            });
        }

        return (
            <table>
                <tbody>
                    {listView}
                </tbody>
            </table>
        );

    }

});

var TwitchUserLogo = React.createClass({

    default_src: 'https://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_WhiteonPurple.png',

    render: function () {
        // CSS inline styles
        var icon_logo = {
            width: '75px',
            height: '75px'
        };

        if (this.props.src) {
            return <img style={icon_logo} src={this.props.src} />;
        }

        return <img style={icon_logo} src={this.default_src} />;
    }

});

var SearchBoxForTwitchGames = React.createClass({

    typingDelay: new TypingDelay(),
    twitch: new TwitchAPI(),

    getInitialState: function() {
      // naming it initialX clearly indicates that the only purpose
      // of the passed down prop is to initialize something internally
      return {text: '...'};
    },

    search: function() {
        var query = this.refs.searchInput.getDOMNode().value; // this is the search text

        this.twitch.searchForGame(query, function(response) {
            this.setState(
                { text: response }
            );
        }.bind(this));
    },

    doSearch: function() {
        this.setState({text: 'searching...'});
        this.typingDelay.delayedRun(this.search);
    },

    componentDidMount: function() {
    },

    render: function() {
        return (
            <div class="input">
            <input type="text"
            ref="searchInput"
            placeholder="Search for game on Twitch"
            value={this.props.query}
            onChange={this.doSearch}
            />
            {this.state.text}
            </div>
        );
    }
});


//
// var ListViewTwitchGames = React.createClass({
//     getInitialState: function() {
//         return {
//             listItems: null
//         };
//     },
//
//     twitch: new TwitchAPI(),
//
//     componentDidMount: function() {
//
//         if (this.props.search_term) {
//             this.twitch.searchForGame(this.props.search_term, function(response) {
//                 this.setState({
//                     listItems: response.channels
//                 });
//             }.bind(this));
//         }
//     },
//
//     render: function() {
//         var data = null;
//         if (this.state.listItems != null) {
//             data = this.state.listItems.map(function(item) {
//                 return (
//                     <li>
//                         {item.name}
//                     </li>
//                 );
//             });
//         }
//         return (
//             <div>
//                 <ul>
//                     {data}
//                 </ul>
//             </div>
//         );
//
//     }
//
// });



React.render(
    <SearchBoxForTwitchChannels />,
    document.getElementById('search_channel')
);

React.render(
    <SearchBoxForTwitchGames />,
    document.getElementById('search_game')
);

// React.render(
//     <ListViewTwitchGames />,
//     document.getElementById('twitch_games')
// );

// var array_of_funcs = [
//     function() { console.log('1'); },
//     function() { console.log('2'); },
//     function() { console.log('3'); }
// ];
//
// for (var func of array_of_funcs) {
//     func;
// }
