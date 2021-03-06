module.exports = {
    entry: './js/entry_point.jsx',
    devtool: 'source-map',
    output: {
        filename: './js/bundle.js'
    },

    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                 test: /\.jsx$/,
                 loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query:
                  {
                    
                    presets:['es2015', 'react']
                  }
            },
        ]
    }
}
