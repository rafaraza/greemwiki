var express = require('express');
var mongojs = require('mongojs');
var db = mongojs("greemdb", ["user"]);

var router = express.Router();

router.post('/login', function(req, res, next) {

  var user = req.body;

  db.user.findOne({ email: user.email, senha : user.senha }, function(err, doc){		
		res.json(doc);
	});
});

router.post('/', function(req, res, next) {

  var user = req.body;

  db.user.insert(user, function(err, doc){		
		res.json(doc);
	});
});

module.exports = router;

/*{
	"nome" : "Greem User",
	"email":"teste@teste.com",
	"senha" : "123"
}*/