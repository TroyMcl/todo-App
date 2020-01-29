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

var addTask = function(callback, task, cat, completed) {
  connection.query(`Insert into todo(task,cat,completed) Values ("${task}","${cat}", ${completed})`, function(err, results) {
    if(err) {
      console.log('error in insert', err)
      callback(err)
    } else {
      callback(null, results)
    }
  })
}

module.exports = {
  selectAll,
  addTask,
}
