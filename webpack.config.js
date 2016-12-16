var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    debug: process.env.NODE_ENV !== 'production',
    context: __dirname,
    entry: {
        js: './js/index.js',
        html: ['./index.html'],
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.(js)$/,
            exclude: /node_modules/,
            loaders: [
                'babel-loader?cacheDirectory'
            ]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(woff|woff2|eot|ttf)$/,
            loader: 'url-loader'
        }],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    devServer: {
        contentBase: '.',
        hot: true
    }
}
