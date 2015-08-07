var express = require('express');
var mongojs = require('mongojs');
var db = mongojs("greemdb", [""]);

var router = express.Router();

router.get('/', function(req, res, next) {

  db.posts.find(function(err,docs){		
  		console.log(posts);
		//res.json(docs);
		res.send(posts);
	});
  
});

module.exports = router;