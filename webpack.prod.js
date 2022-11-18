const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',

    output: {
        clean : true, // limpia archivos innecesarios en el dist y lo vuelve a crear
        filename: 'main.[contenthash].js'


    },

    module: {
        rules: [
            {
                test: /\.html$/, // barre los archivos del pryecto hasta encontrar uno con la extension html
                loader: 'html-loader', // luego se carga el html
                options: {
                    sources : false // realiza acciones automaticas , como cargas de imagenes 
                }

            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]

            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]

    }, 


    optimization : {
        minimize : true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),

        ]
    },

    plugins: [
        new HtmlWebPack({
            title: 'Mi Webpack App', // cambiar titulo del archivo html
            filename: 'index.html', // cambiar nombre del archivo
            template : './src/index.html' // indica del archivo del cual se va a basar

        }),

        new MiniCssExtract({
            filename : '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/'}
            ]

        })
            
    ]

}