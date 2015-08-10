var express 	  = require('express');
var model    	  = require('../model/user');
var router   	  = express.Router();
var passport 	  = require('passport');

//Estratégia Local
var LocalStrategy = require('passport-local').Strategy;

// router.post('/login', function(req, res, next) {
//   var user = req.body;
//   res.json(model.login(user));
// });

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);
 
router.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
router.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

router.post('/', function(req, res, next) {
  var user = req.body;
  res.json(model.insert(user));
});

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    // Auth Check Logic

    var userLog = model.login(user);

    if(!userLog)
    	return done(null, false);
    else  
    	return done(null, userLog);	
  });
}));


module.exports = router;