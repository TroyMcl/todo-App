var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : null,
  database : 'todos'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM todo', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var selectDone = function(callback) {
  connection.query('SELECT * FROM todo WHERE completed = true', function(err, res) {
    if(err) {
      console.log('error in selectDone', err)
      callback(err)
    } else {
      callback(null, res)
    }
  })
};

var addTask = function(callback, task, cat, completed) {
  connection.query(`Insert into todo(task,cat,completed) Values ("${task}","${cat}", ${completed})`, function(err, results) {
    if(err) {
      console.log('error in insert', err)
      callback(err)
    } else {
      callback(null, results)
    }
  })
};

var updateTask = function(id, task, callback) {
  connection.query(`UPDATE todo SET task = "${task}" WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(null, res)
    }
  })
};

var removeTask = function(id, callback) {
  connection.query(`DELETE from todo WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(null, res)
    }
  })
}

module.exports = {
  selectAll,
  addTask,
  selectDone,
  updateTask,
  removeTask,
}
