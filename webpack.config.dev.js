const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            'webpack-hot-middleware/client',
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js/, loader: 'babel', exclude: /node_modules/ }
        ]
    }
};
