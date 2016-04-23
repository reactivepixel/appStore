

var webpack = require('webpack'); // Requiring the webpack lib

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client/js/index.jsx' // Change the index file extension
  ],
  module: {
  loaders: [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'react-hot!babel'
  }, {
    test: /\.css$/,
    loader: 'style!css' // We add the css loader
  }]
},
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + 'src/client/js',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true // Activate hot loading
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // Wire in the hot loading plugin
  ]
};
