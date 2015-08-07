var express = require('express');
var mongojs = require('mongojs');
var db = mongojs("greemdb", ["post"]);

var router = express.Router();

router.get('/', function(req, res, next) {

  db.post.find(function(err,docs){				
		res.json(docs);
	});
});

router.post('/', function(req, res, next) {

  var post = req.body;

  db.post.insert(post, function(err, doc){		
		res.json(doc);
	});
});

module.exports = router;