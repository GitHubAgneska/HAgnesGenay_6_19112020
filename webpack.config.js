var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    // stop minifying main.js
    mode: "development",
    // suppress all eval() in dist/main.js
    // devtool: false,
    // recreate default conf ------
    entry: "./src/index.js",
    output: {
        filename: "main.[contenthash].js",  // .[contenthash] = cache busting (generates new main.js at every change )
        path: path.resolve(__dirname, "dist")
    },
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