const path = require("path");

module.exports = {
    entry: "./src/components/voice-call/Voice-call.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"),
    },
    devServer: {
        compress: true,
        port: 9000,
    },
};