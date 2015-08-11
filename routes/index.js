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
	     	return res.send({ success : true, message : 'authentication succeeded', user : user });
	  })(req, res, next);
	});

	router.get('/auth/google',
	  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

	router.get('/auth/google/callback',
	  passport.authenticate('google', { failureRedirect: '/loginFailure' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
			console.log('deu certo');
	    res.redirect('/');
  });

	router.get('/loginFailure', function(req, res){
		res.send('falhou');
	})

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		console.log("OK");
		res.render('home', { user: req.user });
	});

	router.get('/error', isAuthenticated, function(req, res){
		res.render('error', { user: req.user });
	});

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
};
