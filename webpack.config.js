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
}