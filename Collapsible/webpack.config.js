module.exports = {
    entry: "./src/Collapsible.jsx",
    output: {
        path: "./lib/",
        filename: "Collapsible.js",
        libraryTarget: "umd",
        library: "Collapsible"
    },
    module: {
        loaders: [
            { 
                test: /\.(js|jsx)$/, exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                } 
            },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }
        ],
        preLoaders: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "eslint-loader"}
        ]
    },
    externals: {
        "react": "react",
        "react-dom": "react-dom",
        "react-collapse": "react-collapse",
        "react-motion": "react-motion",
        "react-height": "react-height",
    },
    resolve: {
        extensions: ["", ".js", ".json", ".jsx"] 
    }
};