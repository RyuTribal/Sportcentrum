const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mysqlStore = require("express-mysql-session")(session);
const rss = require("./routes/rss");
const user = require("./routes/user");
const schedule = require("./routes/schedule");
const app = express(),
  bodyParser = require("body-parser"),
  port = 3080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3080",
    "http://127.0.0.1",
    "http://104.142.122.231",
  ],//frontend server localhost:8080
  methods:['GET','POST','PUT','DELETE'],
  credentials: true, // enable set cookie
  exposedHeaders: ["set-cookie"]
 }));

const options = {
  connectionLimit: 10,
  password: "",
  user: "root",
  database: "EIOP_Auth",
  host: "localhost",
  port: "3306",
  createDatabaseTable: true,
};

const sessionStore = new mysqlStore(options);

app.use(cookieParser("Astafurghlah"));
app.use(
  session({
    name: "login",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: "Astafurghlah",
    cookie: {
      maxAge: null,
      sameSite: "lax",
      secure: false,
      httpOnly: true,
    },
  })
);

app.use("/api/rss", rss);
app.use("/api/schedule", schedule);
app.use("/api/users", user);

app.listen(port, () => {
  console.log(`Server listening on port::${port}`);
});

//this code is halal certified
