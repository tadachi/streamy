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
