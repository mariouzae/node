module.exports = function(app){

	app.get('/produtos', function(req, res){
		var connection = app.db.dbFactory();
		var productsDAO = new app.db.ProductsDAO(connection);

		productsDAO.list(function(err, result){
			console.log(result);
			res.format({
				html: function(){
					res.render('produtos/lista', {lista:result});	
				},
				json: function(){
					res.json('produtos/lista', {lista:result});		
				}
			});
		});
		connection.end();
	});

	app.get('/produtos/form', function(req, res){
		res.render('produtos/form', {errors:{}, produto:{}});
	});

	app.post('/produtos', function(req, res){
		var connection = app.db.dbFactory();
		var productsDAO = new app.db.ProductsDAO(connection);

		var produtos = req.body;

		req.assert('description', 'A descrição é obrigatória').notEmpty();
		req.assert('pages', 'O número de páginas é obrigatórió e deve número').isFloat();

		var errors = req.validationErrors();

		if(errors){
			res.render('produtos/form', {errors:errors, produto:produtos});
			return;			
		}

		productsDAO.save(produtos, function(err, result){
			res.redirect('/produtos');
			console.log(err);
		});
	})
}