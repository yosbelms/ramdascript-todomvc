var webpack = require('webpack')

module.exports = {
    entry: './src/app.ram',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.json', '.ram']
    },
    output: {
        filename: 'dist/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ram$/,
                loaders: ['babel-loader', 'ramdascript-loader']
            }
        ]
    },

    // dev server config
    devServer: {
        contentBase: './',
        compress: true,
        port: 8000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}