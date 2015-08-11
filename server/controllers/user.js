var express 	  = require('express');
var model    	  = require('../model/user');
var router   	  = express.Router();

router.post('/login', function(req, res, next) {
  var user = req.body;
  res.json(model.login(user));
}); 

router.post('/', function(req, res, next) {
  var user = req.body;
  res.json(model.insert(user));
});

module.exports = router;