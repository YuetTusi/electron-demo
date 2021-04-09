const path = require('path');
const { getEntry, getHtmlPlugins } = require('./webpack.tools');
const rendererPath = path.join(__dirname, './src/renderer');

let config = {
	mode: 'development',
	entry: getEntry(rendererPath),
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist/renderer'),
		publicPath: 'http://localhost:8080' //配置路径以保证热更新正确
	},
	target: 'electron-renderer',
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		port: 8080,
		compress: true,
		open: false,
		overlay: {
			errors: true
		}
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
