const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {User} = require("../db")

passport.use(new GoogleStrategy({
  clientID: "1042216557034-foecoc9icuqhahh5bndoabjgukv7aa16.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
  
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
