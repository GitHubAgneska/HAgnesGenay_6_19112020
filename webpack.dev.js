const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    // stop minifying main.js
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html", // use this template to generate dist/html and inside include script "main.[contenthash].js"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // 3 - inject <style> in DOM (≠ prod where separate bundle css file with mini-css-extract-plugin)
                    "css-loader",   // 2 - css => js
                    "sass-loader"   // 1 - scss => css
                ]
            }
        ]
    }
});