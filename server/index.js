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

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

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
  let task = req.body.value;
  let cat = req.body.cat;
  let comp = false;
  items.addTask(function (err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.json(data)
    }
  }, task, cat, comp)
});

app.put('/task', function(req,res) {
  let id = req.body.id;
  let task = req.body.task
  items.updateTask(id, task, function(err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
});

app.put('/cat', function(req,res) {
  let id = req.body.id;
  let cat = req.body.cat
  items.updateCat(id, cat, function(err, data) {
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
  items.updateCompleted(id, comp, function(err, data) {
    if(err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  })
});

app.delete('/', function(req,res) {
  let id = req.body.id;
  items.removeTask(id, function (err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      items.selectAll(function(err, data) {
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

