function ProductsDAO(connection){
	this._connection = connection;
}

ProductsDAO.prototype.list = function(callback){
	this._connection.query('select * from Product', callback);
}

ProductsDAO.prototype.save = function(produtos, callback){
	this._connection.query('insert into Product set ?', produtos, callback);
}

module.exports = function(){
	return ProductsDAO;
}