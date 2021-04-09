const path = require('path');
const { getEntry, getHtmlPlugins } = require('./webpack.tools');
const rendererPath = path.join(__dirname, './src/renderer');

let config = {
	mode: 'production',
	entry: getEntry(rendererPath),
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist')
	},
	target: 'electron-renderer',
	optimization: {
		minimize: true
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: [
					{
						loader: 'ts-loader'
					}
				]
			}
		]
	},
	plugins: [...getHtmlPlugins(rendererPath)]
};

module.exports = config;
