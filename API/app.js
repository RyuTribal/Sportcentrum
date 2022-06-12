const express = require("express");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const rss = require("./routes/rss");
const user = require("./routes/user");
const schedule = require("./routes/schedule");
const passport = require('passport');
const app = express(),
  bodyParser = require("body-parser"),
  port = 3080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

const options = {
  connectionLimit: 10,
  password: "",
  user: "root",
  database: "sportcentrum",
  host: "localhost",
  port: "3306",
  createDatabaseTable: true,
};

const sessionStore = new mysqlStore(options);

app.use(
  session({
    name: "login",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: "Astafurghlah",
    cookie: {
      maxAge: null,
    },
  })
);

app.use(passport.authenticate("session"));

app.use("/api/rss", rss);
app.use("/api/schedule", schedule);
app.use("/api/users", user);

app.listen(port, () => {
  console.log(`Server listening on port::${port}`);
});

//this code is halal certified
