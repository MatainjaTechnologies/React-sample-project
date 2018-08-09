const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
require("babel-polyfill");

const htmlPlugins = new HtmlWebPackPlugin({
    template: './frontend/index.html',
    filename: './index.html',
});

module.exports = {
    entry: ["babel-polyfill",'./frontend/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 5000
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './frontend/index.html',
            filename: './index.html',
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                compress: true,   
                output: {
                    comments: false, // remove all comments
                }
            }
        }),        
    ],
    optimization: {
        nodeEnv: 'production'
    }
};