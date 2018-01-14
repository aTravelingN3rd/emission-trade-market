var express = require('express'),
    util = require('util'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb');

var app = express();

var roles = {
    guest:     'guest',
    regulator: 'regulator',
    company:   'company'
};

var users = [
    {username: 'admin', password: '123', role: 'regulator'},
    {username: 'user1', password: '123', role: 'company'},
    {username: 'user2', password: '123', role: 'company'}];

//mongodb
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/doxchain";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("doxchain");
  dbo.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

//app
app.listen(8080);

// Require body-parser (to receive post data from clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/app', express.static(__dirname + '/app'));

app.get('/', function(req, res) {
    res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.post('/', function (req, res) {
    var role = roles.guest, username = '';

    //console.log(util.inspect(req.body));

    if (req.body) {
        username = req.body.username;
        var i;
        for (i = 0; i < users.length; i++){
            if(req.body.username == users[i]['username'] && req.body.password == users[i]['password']){
                role = users[i]['role'];
            }
        }
    }

    res.cookie('user', JSON.stringify({
        'username': username,
        'role': role
    }));

    console.log(JSON.stringify({username: username, role: role}));
    res.send({username: username, role: role});
});