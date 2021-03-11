
const path = require("path");

module.exports = {
    entry: "./src/index.js", // or { main: "./src/index.js", vendor:"./src/vendor.js", ..  } for multiple entry points
    // devtool: false, // more readable version of bundles = no effect atm (?)
    output: { assetModuleFilename: "assets/[name].[hash][ext][query]" },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', //for compatibility accross browsers
                    options: {
                            presets: ['@babel/preset-env']  // could be done in a separate file babel.config.js
                        }
                    }
                },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                // type: "asset/inline"  ==> will output ALL imgs inline into bundled js instead of in separate file (for SMALL IMGS e.g)
                // type: "asset" ==>  WP will determine the above automatically for some of the imgs only (customizable)
                use: {
                    // type: 'asset/resource'
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs",
                        publicPath: ""
                    }
                }
            },
            {
                test: /\.(woff|ttf|otf|eot|woff2)$/i,
                use: { 
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "fonts"
                    }
                }   
            }
        ]
    }
}