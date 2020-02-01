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

var findUser = function(user, callback) {
  connection.query(`insert into users(user) select "${user}" from dual where not exists (select * from users where user="${user}")`, function(err, result) {
    if(err) {
      console.log(err)
      callback(err)
    } else {
      if (result.insertId === 0) {
        connection.query(`Select * from users where user="${user}"`, function (error, res) {
          if (error) {
            callback(error)
          } else {
            callback(null, {id: res[0].id})
          }
        })
      } else {
        callback(null, {id: result.insertId})
      }
    }
  })
}

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
  connection.query(`Insert into todo(task,cat,completed,userID) Values ("${task}","${cat}", ${completed}, 1)`, function(err, results) {
    if(err) {
      console.log('error in insert', err)
      callback(err)
    } else {
      let newId = results.insertId;
      connection.query(`SELECT * FROM todo WHERE id=${newId}`, function(err, res) {
        if (err) {
          callback(err)
        } else {
          callback(null, res)
        }
      })

    }
  })
};

var updateTask = function(id, task, callback) {
  connection.query(`UPDATE todo SET task = "${task}" WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      connection.query(`SELECT * FROM todo`, function(error, response) {
        if (error) {
          console.log(error)
          callback(error)
        } else {
          callback(null, response)
        }
      })
    }
  })
};

var updateCat = function(id, cat, callback) {
  connection.query(`UPDATE todo SET cat = "${cat}" WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      connection.query(`SELECT * FROM todo`, function(error, response) {
        if (error) {
          console.log(error)
          callback(error)
        } else {
          callback(null, response)
        }
      })
    }
  })
};

var updateCompleted = function(id, comp, callback) {
  connection.query(`UPDATE todo SET completed = "${comp}" WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      connection.query(`SELECT * FROM todo`, function(error, response) {
        if (error) {
          console.log(error)
          callback(error)
        } else {
          callback(null, response)
        }
      })
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
  updateCat,
  updateCompleted,
  findUser,
}
