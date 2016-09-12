var db = require('mysql');

var createConnection = function() {
	console.log("agora sim com o mysql");
	return db.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'casadocodigo'
		});
}

module.exports = function(){
	console.log("load database");
	return createConnection;
}