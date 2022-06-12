const GoogleStrategy = require("passport-google-oidc");
const passport = require("passport");
let mysql = require("mysql");
require("dotenv").config({ path: "../user/KEYS.env" });

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "782569475524-4r9ga9u5uinm700fuvp0nu22fe1ark49.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3080/api/users/oauth2/redirect/google",
      scope: ["profile"],
    },
    async function (issuer, profile, cb) {
      let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sportcentrum",
        multipleStatements: true,
      });
      await con.query(
        "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
        [issuer, profile.id],
        function (err, row) {
          if (err) {
            return cb(err);
          }
          let user_row = row;
          if (user_row.length < 1) {
            con.query(
              "INSERT INTO users (name) VALUES (?)",
              [profile.displayName],
              function (err, res) {
                if (err) {
                  return cb(err);
                }

                id = res.insertId;
                con.query(
                  "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
                  [id, issuer, profile.id],
                  function (err) {
                    if (err) {
                      con.end();
                      return cb(err);
                    }
                    var user = {
                      id: id,
                      name: profile.displayName,
                    };
                    con.end();
                    return cb(null, user);
                  }
                );
              }
            );
          } else {
            con.query(
              "SELECT * FROM users WHERE id = ?",
              [user_row.user_id],
              function (err, row) {
                if (err) {
                  con.end();
                  return cb(err);
                }
                if (!row) {
                  con.end();
                  return cb(null, false);
                }
                con.end();
                return cb(null, row);
              }
            );
          }
        }
      );
    }
  )
);
