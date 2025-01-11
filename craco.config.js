const path = require('path');

module.exports = {
	reactScriptsVersion: 'react-scripts',
	webpack: {
		configure: webpackConfig => {
			webpackConfig.output.publicPath = '/spotbot/'; // Путь для подкаталога
			return webpackConfig;
		},
		alias: {
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@views': path.resolve(__dirname, 'src/views'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@services': path.resolve(__dirname, 'src/services'), // Если нужно
		},
	},
};
