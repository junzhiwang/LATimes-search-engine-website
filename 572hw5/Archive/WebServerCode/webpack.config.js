'use strict';
const webpack = require('webpack');
module.exports = {
    context: __dirname + '/src',
	entry: {
        app: ['./index.js']
    },
	output: {
		path: __dirname + '/dist/assets',
		filename:'[name].bundle.js',
		publicPath:'assets'
	},
    devServer: {
        inline: true,
        contentBase: __dirname + '/dist',
        port: 3000
    },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['latest','stage-0','react']
          }
        }]
			},
      {
				test: /\.css$/,
        include: /flexboxgrid/,
        loader: 'style-loader!css-loader?modules',
			},
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /(node_modules)/,
      },
		]
	},
  plugins: [
    ]
}
