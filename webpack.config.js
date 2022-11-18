const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',

    output: {
        clean : true, // limpia archivos innecesarios en el dist y lo vuelve a crear


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
            }
        ]

    }, 


    optimization : {},

    plugins: [
        new HtmlWebPack({
            title: 'Mi Webpack App', // cambiar titulo del archivo html
            filename: 'index.html', // cambiar nombre del archivo
            template : './src/index.html' // indica del archivo del cual se va a basar

        }),

        new MiniCssExtract({
            filename : '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/'}
            ]

        })
            
    ]

}