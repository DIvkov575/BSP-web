const express = require("express")
const server = express()

server.use(express.static('public'));

server.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
    // res.sendFile(__dirname + 'public/main.js');
});

server.get('/a', function(req, res) {
    res.sendFile(__dirname + '/public/about.html');
    // res.send("alskfhjd")
    // res.sendFile(__dirname + 'public/main.js');
});

server.listen(3000, () => console.log("Server Listening on Port 3000"))
