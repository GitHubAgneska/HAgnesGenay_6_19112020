const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // present by default in node-modules
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const target = "web";  => see target attr below

module.exports = merge(common, {
    mode: "production",
    // target: "browserslist", => works with custom .browserslistrc file, made for babel and postcss loaders (vendor prefixes)
    output: {
        filename: "main.[contenthash].js",  // .[contenthash] = cache busting (generates new main.---.js at every change )
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new OptimizeCssWebpackPlugin(), // used alone, will only minify css & override default js minifying (terser)
            new TerserPlugin(), // completes previous to minify also js
            new HtmlWebpackPlugin({
                template: "./src/template.html", // use this template to generate dist/html and inside include script "main.[contenthash].js"
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            }),
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css"}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // 3 - extract css into files ( ≠ dev where css included in js bundle)
                    "css-loader",   // 2 - css => js
                    "sass-loader"   // 1 - scss => css
                ]
            }
        ]
    }
});
