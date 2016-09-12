module.exports = function(app) {
	app.get('/', function(req,res){
		var connection = app.db.dbFactory();
		var produtosDAO = new app.db.ProductsDAO(connection);
		produtosDAO.list(function(erros, resultados){
			res.render('home/index', {lista:resultados});
		});
		connection.end();
	});
}