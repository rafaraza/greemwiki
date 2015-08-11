var mongojs = require('mongojs');
var db = mongojs("greemdb", ["user"]);

module.exports = {  

	login : function(user) {
		db.user.findOne({ email: user.email, senha : user.senha }, function(err, doc){					
			return doc;
		 });
	},

	__db: db,

	insert : function(user) {
		db.user.insert(user, function(err, doc){		
			return doc;
		});		
	}

};

