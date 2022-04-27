const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
var mysql = require('mysql');
// require('dotenv').config({ path: './user/KEYS.env' })

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback   : true
},
// Return the user profile
function(request, accessToken, refreshToken, profile, done) {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: 'sportcentrum'
    });

    let sql = "INSERT INTO `user` (`id`, `name`) SELECT '" + profile.id +"', '" + profile.displayName +"' FROM DUAL WHERE NOT EXISTS (SELECT * FROM `user` WHERE `id`='" + profile.id +"' LIMIT 1) ";

    con.query(sql);
    con.end();

    return done(null, profile);
  }
));
