module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],

        files: [
            'test/*.js'
        ],

        preprocessors: {
            'test/*.js': ['webpack']
        },

        webpack: {
        },

        webpackMiddleware: {
        },

        plugins: [
            require("karma-webpack"),
            require("karma-mocha")
        ]

    });
};