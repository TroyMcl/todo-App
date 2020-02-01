var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : null,
  database : 'todos'
});

var selectAll = function(user, callback) {
  connection.query(`SELECT * FROM todo where userID = "${user}"`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var findUser = function(user, callback) {
  let info = {}
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
            console.log('getting user id num', res[0].id, res)
            info.id = res[0].id
            let id = res[0].id
            connection.query(`Select * from todo where userID="${id}"`, function (err, res) {
              if (err) {
                callback(err)
              } else {
                info.tasks = res;
                callback(null, info)
              }
            })
          }
        })
      } else {
        info.id = result.insertId;
        let id = result.insertId;
        connection.query(`Select * from todo where userID="${id}"`, function (err, res) {
          if (err) {
            callback(err)
          } else {
            info.tasks = res;
            callback(null, info)
          }
        })
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

var addTask = function(task, cat, completed, user, callback) {
  connection.query(`Insert into todo(task,cat,completed,userID) Values ("${task}","${cat}", ${completed}, "${user}")`, function(err, results) {
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

var updateTask = function(id, task, user, callback) {
  connection.query(`UPDATE todo SET task = "${task}" WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      connection.query(`SELECT * FROM todo where userID="${user}"`, function(error, response) {
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

var updateCat = function(id, cat, user, callback) {
  connection.query(`UPDATE todo SET cat = "${cat}" WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      connection.query(`SELECT * FROM todo where userID=${user}`, function(error, response) {
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

var updateCompleted = function(id, comp, user, callback) {
  connection.query(`UPDATE todo SET completed = "${comp}" WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      connection.query(`SELECT * FROM todo where userID="${user}"`, function(error, response) {
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
