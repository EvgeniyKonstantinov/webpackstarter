module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(ttf|woff|woff2)$/,
                    loader: "file-loader",
                    options: {
                      name: "fonts/[name].[ext]",
                    },
                },
            ],
        },
    };
};


