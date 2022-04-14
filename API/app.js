const express = require('express');
const rss = require('./routes/rss');
const app = express(),
        bodyParser = require('body-parser'),
        port = 3080;

app.use(bodyParser.json());

app.use('/api', rss);

app.listen(port, () =>{
    console.log(`Server listening on port::${port}`);
});

//this code is halal certified