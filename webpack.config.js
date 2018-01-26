var debug = process.env.NODE_ENV !== "production"
var glob = require('glob')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    app: [
      "bootstrap/dist/css/bootstrap.min.css",
      "./testCode/styles/main.scss",
      "angular",
      "angular-mocks",
      "angular-route",
      "angular-animate",
      "restangular",
      "./testCode/app/configs/routeConfig.js",
      "./testCode/app/controllers/CompanyListCtrl.js",
      "./testCode/app/controllers/EditPersonCtrl.js",
      "./testCode/app/controllers/EditCompanyCtrl.js",
      "./testCode/app/controllers/PeopleCtrl.js",
      "./testCode/app/factories/companyFactory.js",
      "./testCode/app/factories/personFactory.js"
    ]
  },
  output: {
    path: __dirname + "/testCode/",
    filename: "bundle.min.js"
  },

  devServer: {
    inline: true,
    hot: true,
    contentBase: './app'
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: debug ? [
    new ExtractTextPlugin('style.css'),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};
