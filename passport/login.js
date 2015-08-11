var LocalStrategy   = require('passport-local').Strategy;
var model = require('../server/model/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true,
            badRequestMessage: 'erro',
            usernameField: 'username',
            passwordField: 'password'

        },
         function(req, username, password, done) { 
            
            // check in mongo if a user with username exists or not
             var user = { email: username, senha : password };

             model.__db.user.findOne({ email: user.email, senha : user.senha }, function(err, doc){                 

                 if (!doc){
                     console.log('User Not Found with username '+username);
                     return done(null, false, req.flash('message', 'User Not found.'));                 
                 }
           
                // User and password both match, return user from done method
                // which will be treated like success
                return done(null, doc);
             });
        })
    );  
    
}