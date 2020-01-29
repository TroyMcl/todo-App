var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mongo');
var items = require('../database-mysql');
var app = express();

//UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/completed', function (req, res) {
  //eventually get user num
  //call items method to query db for all tasks matching user and comp === true
  items.selectDone(function (err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.json(data)
    }
  })
});

app.post('/', function(req,res) {
  //need user number - keep in react state
  console.log(req.body)
  let task = req.body.value;
  //let cat = req.body.cat;
  let cat = 'stuff';
  //let comp = req.body.comp;
  let comp = false;
  //call items method to write new to do into db
  items.addTask(function (err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.json(data)
    }
  }, task, cat, comp)
  //be sure change is visable to user
});

app.put('/', function(req,res) {
  //need user number
  //way to id existing task- id of todo table
  //call items method to update task with new val (add way to update cat & comp in future)
  let id = req.body.id;
  console.log(typeof id)
  let task = req.body.task
  items.updateTask(id, task, function(err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
  //make sure change is visable to user
});

app.delete('/', function(req,res) {
  //need user number
  //id task to remove - id of todo table
  let id = req.body.id;
  items.removeTask(id, function (err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
  //make sure change is visable to user
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

