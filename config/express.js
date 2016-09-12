var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
	
	var app = express();
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	
	// middlewares
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	app.listen(3000, function(){
	console.log("server running...");
	});

	load('routes', {cwd:'app'})
	.then('db')
	.into(app);

	return app;
}