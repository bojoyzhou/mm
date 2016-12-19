var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    debug: process.env.NODE_ENV !== 'production',
    context: __dirname,
    entry: {
        index: ['./index.html', './js/index.js'],
        canvas: ['./test/canvas.html','./test/testBezier.js'],
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js',
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
