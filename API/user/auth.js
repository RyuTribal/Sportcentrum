// Client ID: 993158428352-do7iu68sm3tu5a4eaqit3i48mdef68r3.apps.googleusercontent.com
// Client secret: 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
// Callback URL: http://localhost:3080/api/user/google/callback

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:"993158428352-do7iu68sm3tu5a4eaqit3i48mdef68r3.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:3080/auth/google/callback",
    passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
    return done(null, profile);
  }
));