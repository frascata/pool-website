// Libs from Node
const path = require('path');
const glob = require('glob');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Paths
const srcDir = path.resolve(__dirname, 'static/bundles/local/');
const distDir = path.resolve(__dirname, 'static/bundles/prod/');
const distDirDev = path.resolve(__dirname, 'static/bundles/local/');

// Configurazione di Webpack
module.exports = (env) => {
    const {production, isDevBuild} = env;
    const {loader} = MiniCssExtractPlugin;

    const isProd = production === 'prod';
    const isBuildForProd = isDevBuild === 'prod';
    const devTool = production === 'prod' ? false : 'inline-source-map';
    const publicPath = production === 'prod' ? '' : 'http://localhost:3000/assets/bundles/';

    return {
        mode: isProd ? 'production' : 'development',
        devtool: devTool,
        context: srcDir,
        entry: {
            HomeGallery: path.resolve(__dirname, 'frontend/HomeGallery.js'),
            ProjectsGallery: path.resolve(__dirname, 'frontend/ProjectsGallery.js'),
            vendors: path.resolve(__dirname, 'node_modules/react'),
        },
        output: {
            chunkFilename: '[name]-[hash].js',
            filename: '[name]-[hash].js',
            jsonpFunction: '[name]-[hash]',
            path: isBuildForProd ? distDir : distDirDev,
            publicPath
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: path.resolve(__dirname, 'node_modules/'),
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {modules: false}]]
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        isProd ? loader : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        resolve: {
            modules: [srcDir, 'node_modules'],
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new PurgeCssPlugin({
                paths: glob.sync(`${srcDir}/**/*`, {nodir: true})
            }),
            new MiniCssExtractPlugin({
                filename: '[name]-[hash].min.css'
            }),
            new BundleTracker({
                path: __dirname,
                filename: isProd ? 'webpack-stats-prod.json' : 'webpack-stats-local.json',
            }),
            isBuildForProd ? new Dotenv({path: './frontend/config/.env.production'}) : new Dotenv({path: './frontend/config/.env.development'}),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    },
                    extractComments: false
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, distDir),
            port: 3000,
            disableHostCheck: true,
            hot: true,
            open: false,
            inline: true
        }
    };
};
