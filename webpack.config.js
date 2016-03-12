module.exports = {
    entry: './app/js/entry_point.jsx',
    output: {
        filename: './app/js/bundle.js'
    },
    devtool: 'source-map',
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
                    presets:['react']
                  }
            },
        ]
    }
}
