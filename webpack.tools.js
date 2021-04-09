const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 加载入口文件
 * @param {string} url 入口目录
 */
function loadEntry(url) {
	let viewFiles = [];
	try {
		const dir = fs.readdirSync(url);
		viewFiles = dir.map((i) => ({
			[i]: fs.readdirSync(path.join(url, i))
		}));
	} catch (error) {
		console.error(error);
	}
	return viewFiles;
}

function getEntry(url) {
	console.log(`Start parse entry from ${url}:`);
	let viewFiles = loadEntry(url);
	let entry = {};
	for (let i = 0, l = viewFiles.length; i < l; i++) {
		for (let [k, v] of Object.entries(viewFiles[i])) {
			const p = path.join(url, k, v.filter((i) => path.extname(i) === '.tsx')[0]);
			console.log(`entry${i + 1}(${k})-${p}`);
			entry[k] = p;
		}
	}
	return entry;
}

function getHtmlPlugins(url) {
	let plugins = [];
	const viewFiles = loadEntry(url);

	for (let i = 0, l = viewFiles.length; i < l; i++) {
		for (let [k, v] of Object.entries(viewFiles[i])) {
			let temp = v.filter((i) => path.extname(i) === '.html')[0];
			plugins.push(
				new HtmlWebpackPlugin({
					template: path.join(url, k, temp),
					filename: temp,
					chunks: [k]
				})
			);
		}
	}
	return plugins;
}

module.exports = {
	getEntry,
	getHtmlPlugins
};
