var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
	
	var app = express();
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	
	// Middlewares
	// Map a public directory to store statics files.
	app.use(express.static('./app/public'));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	app.listen(3000, function(){
	console.log("server running on port 3000...");
	});

	load('routes', {cwd:'app'})
	.then('db')
	.into(app);

	return app;
}