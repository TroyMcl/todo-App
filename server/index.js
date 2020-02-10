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

app.post('/user', function (req, res) {
  let user = req.body.user
  items.findUser(user,function (err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.json(data)
    }
  })
})

app.get('/completed', function (req, res) {
  items.selectDone(function (err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.json(data)
    }
  })
});

app.post('/add', function(req,res) {
  let task = req.body.value;
  let cat = req.body.cat;
  let user = req.body.user;
  let comp = false;
  items.addTask(task, cat, comp, user, function (err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.json(data)
    }
  })
});

app.put('/task', function(req,res) {
  let id = req.body.id;
  let task = req.body.task;
  let user = req.body.user;
  items.updateTask(id, task, user, function(err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
});

app.put('/cat', function(req,res) {
  let id = req.body.id;
  let cat = req.body.cat;
  let user = req.body.user
  items.updateCat(id, cat, user, function(err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
});

app.put('/completed', function(req,res) {
  let id = req.body.id;
  let comp = req.body.comp;
  let user = req.body.user;
  items.updateCompleted(id, comp, user, function(err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
});

app.post('/finished', function(req, res) {
  let id = req.body.id;
  items.getCompleted(id, function(err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
});

app.post('/unfinished', function(req,res) {
  let id = req.body.id;
  items.getUnfinished(id, function(err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
})

app.delete('/', function(req,res) {
  let id = req.body.id;
  let user = req.body.user;
  items.removeTask(id, function (err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      items.selectAll(user,function(err, data) {
        if(err) {
          res.sendStatus(500);
        } else {
          res.json(data);
        }
      });
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

