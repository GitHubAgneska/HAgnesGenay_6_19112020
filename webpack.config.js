const path = require("path");

module.exports = {
    // stop minifying main.js
    mode: "development",
    // suppress all eval() in dist/main.js
    // devtool: false,
    // recreate default conf ------
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
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