const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
	mode: 'development',
	entry: { index: './src/renderer/index/index.tsx', demo: './src/renderer/demo/demo.tsx' },
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
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/renderer/index/index.html'),
			filename: 'index.html',
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/renderer/demo/demo.html'),
			filename: 'demo.html',
			chunks: ['demo']
		})
	]
};

module.exports = config;
