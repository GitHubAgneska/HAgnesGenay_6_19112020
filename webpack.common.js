var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html" // use this template to generate dist/html and inside include script "main.[contenthash].js"
    })],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // 3 - inject <style> in DOM
                    "css-loader",   // 2- css=>js
                    "sass-loader"   // 1 - scss => css
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [ "file-loader" ]
            },

        ]
    }
}