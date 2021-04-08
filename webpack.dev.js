const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
	mode: 'development',
	entry: { index: './src/renderer/index/index.tsx', demo: './src/renderer/demo/demo.tsx' },
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist/renderer')
	},
	target: ['electron-renderer'],
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
