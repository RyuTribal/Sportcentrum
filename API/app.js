const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const rss = require('./routes/rss');
const schedule = require('./routes/schedule');
const scraper = require('./routes/scraper');
const app = express(),
        bodyParser = require('body-parser'),
        port = 3080;

require('dotenv').config({ path: './user/KEYS.env' })
require("./user/auth");

// Use cookie-parser to read cookies
app.use(cookieParser(process.env.SESSION_KEY));

// Encrypted cookie using key and send it to browser, because we dont want to send a normal id because then anyone can access it
app.use(cookieSession({
    maxAge: 24*60*60*1000, // miliseconds
    //secure: true, // only send over HTTPS connection
    //httpOnly: true, // only send over HTTP and HTTPS and not client JS
    name: 'google-auth-session',
    keys: [process.env.SESSION_KEY] // Encrypt cookie using key. Put the key in seperate file and git ignore it.
  }))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// initialize passport
app.use(passport.initialize());

// use cookie session
app.use(passport.session());

// Test start button
app.get('/', (req, res) => {
    res.send("<button><a href='http://localhost:3080/auth/google'>Login With Google</a></button>")
});

app.get("/failed", (req, res) => {res.send("Failed")})
app.get("/success", isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})

// Scope
app.get('/auth/google',passport.authenticate('google', {scope:['profile', 'email']}));

// Token received from google
app.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/failed',}),
    function (req, res) {
        res.redirect('/success')
    }
);

// Logout
app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use('/api/rss', rss);
app.use('/api/schedule', schedule);
app.use('/api/scraper', scraper)

app.listen(port, () =>{
    console.log(`Server listening on port::${port}`);
});

//this code is halal certified