var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport){
  passport.use('google', new GoogleStrategy({
      clientID: "94340052188-vqu3rp3e921p8vf1ju7v0mfaii706khr.apps.googleusercontent.com",
      clientSecret: "DzTPSt_nZ-s_wUFCGKuSG2dx",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  ));
};
