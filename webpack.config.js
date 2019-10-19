const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        content: './src/app/content.ts',
        background: './src/app/background.ts',
        popup: './src/ui/popup.tsx',
    },

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".less"]
    },

    module: {
        rules: [
            { test: /\.(jpg|svg|png|gif)?$/, loader: "file-loader", options:{
                name: '[name].[ext]',
            }},
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader', {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName:'[name]__[local]___[hash:base64:5]'
                }
            }] },
            { test: /\.less$/, use: ['style-loader', {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName:'[name]__[local]___[hash:base64:5]'
                }
            }, 'less-loader'] }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'public', to: '../' },
          ]),
      ],
};
