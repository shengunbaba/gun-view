const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require('path')
module.exports = {

    entry: {
        main: "./src/index.tsx",
        vendor: ["react", "react-dom", "react-router", "react-router-dom"]
    },
    output: {
        path: __dirname + "./dist",
        publicPath: "/"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader"
                    }
                ]
            },
            {enforce: "pre", test: /\.tsx?$/, loader: "source-map-loader"},

            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" //将css代码以<style>标签的形式插入页面
                    },
                    {
                        loader: "css-loader" //检查css代码中的import语句找到依赖，并合并
                    },
                    {
                        loader: "less-loader",
                        options: {
                            strictMath: true,
                            noIeCompat: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "luban-view": "../../index",
            '@': '/'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            chunksSortMode: "dependency"
        })
    ],
    optimization: {},
    mode: "development"
};
