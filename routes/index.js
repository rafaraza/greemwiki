var express = require('express');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects	
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page	
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res, next) {
  		res.render('index', { title: 'Express' });
	});

	router.post('/login', function(req, res, next) {
	  passport.authenticate('login', function(err, user, info) {

		     if (err) {
		       return next(err); 
		     }
	        
	    	if (!user) {
	       		return res.send({ success : false, message : 'authentication failed' });
	     	}
	     	return res.send({ success : true, message : 'authentication succeeded' });
	  })(req, res, next);
	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		console.log("OK");
		res.render('home', { user: req.user });
	});

	router.get('/error', isAuthenticated, function(req, res){			
		res.render('error', { user: req.user });
	});

	return router;
};
