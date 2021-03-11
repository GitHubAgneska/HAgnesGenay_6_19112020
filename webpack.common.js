
const path = require("path");

module.exports = {
    entry: "./src/index.js", // or { main: "./src/index.js", vendor:"./src/vendor.js", ..  } for multiple entry points
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                use: {
                    // type: 'asset/resource',
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }
            }
        ]
    }
}