const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
var mysql = require('mysql');
// require('dotenv').config({ path: './user/KEYS.env' })

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: 'sportcentrum'
// });

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
// passport.deserializeUser(function(user, done) {
//     /*
//     Instead of user this function usually recives the id 
//     then you use the id to select the user from the db and pass the user obj to the done callback
//     You can later access this data in any routes in: req.user
//     */
//     done(null, user);
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL,
//     passReqToCallback   : true
// },
// function(request, accessToken, refreshToken, profile, done) {
//     /*
//     let checkUser = "SELECT COUNT(1) FROM user WHERE name = '" + profile.id + "'";
//     let createUser = "INSERT INTO `user` (`id`, `name`) VALUES ('" + profile.id + "', '" + profile.displayName + "')";

//     con.query(checkUser, (error, results, fields) => {
//       if (error) throw err;
//       if (results[0]['COUNT(1)'] == 0) {
//         con.query(createUser);
//       }
//     });

//     con.end();

//     return done(null, profile);
//     */

//     /*
//      use the profile info (mainly profile id) to check if the user is registerd in ur db
//      If yes select the user and pass him to the done callback
//      If not create the user and then select him and pass to callback
//     */
//     // console.log(profile);
//     return done(null, profile);
//   }
// ));