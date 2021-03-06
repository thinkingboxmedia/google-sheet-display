var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var openurl = require('openurl');
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false
	}
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'src')));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(3000, '0.0.0.0', function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:3000');
	openurl.open('http://localhost:3000');
});