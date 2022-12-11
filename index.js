const express = require("express");
const server = express()

server.use(express.static('public'));

server.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
    // res.sendFile(__dirname + 'public/main.js');
});

server.get('/about', function(req, res) {
    res.sendFile(__dirname + '/public/about.html');
});

server.get('/sign-up', function(req, res) {
    res.sendFile(__dirname + '/public/sign-up.html');
});

server.get('/questions', function(req, res) {
    res.sendFile(__dirname + '/public/question-form.html');
});

server.listen(3000, () => console.log("Server Listening on Port 3000"))
