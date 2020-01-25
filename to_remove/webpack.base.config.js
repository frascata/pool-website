var path = require('path');
var webpack = require('webpack');
// var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    //context: __dirname,

    entry: {
        // Add as many entry points as you have container-react-components here
        HomeGallery: './frontend/HomeGallery',
        ProjectsGallery: './frontend/ProjectsGallery',
        vendors: ['react'],
    },

    output: {
        path: path.resolve('./website/static/bundles/local/'),
        filename: '[name]-[hash].js',
    },

    resolve: {
        modules: [
            "node_modules",
        ],
        extensions: ['.js', '.jsx'],
    },

    // module: {
    //     loaders: [] // add all common loaders here
    // },

    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    // ], // add all common plugins here

    // optimization: {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         chunks: 'all',
    //         cacheGroups: {
    //             default: {enforce: true, priority: 1},
    //             vendors: {test: /[\\/]node_modules[\\/]/, priority: 2, name: 'vendors', enforce: true, chunks: 'all'}
    //         }
    //     }
    // },
};
