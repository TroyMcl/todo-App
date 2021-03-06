import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      user: '',
      tasks: [],
      value: '',
      catValue: '',
      focusedValue: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.taskEdit = this.taskEdit.bind(this);
    this.focusOn = this.focusOn.bind(this);
    this.catEdit = this.catEdit.bind(this);
    this.toggleComp = this.toggleComp.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getFinished = this.getFinished.bind(this);
    this.getUnfinished = this.getUnfinished.bind(this);
  }

  addUser(e) {
    this.setState({user: e.target.value})
  }

  getUser(e) {
    e.preventDefault();
    let userName = { user: this.state.user };
    let stuff = JSON.stringify(userName)
    $.ajax({
      type:'POST',
      url: '/user',
      headers: { 'Content-type' : 'application/json'},
      data: stuff,
      success: (res => {
        console.log(res.tasks)
        this.setState({
          userId: res.id,
          tasks: res.tasks
        })
      }),
      dataType: 'JSON',
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleChangeCat(event) {
    this.setState({
      catValue: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let task = {value: this.state.value, cat: this.state.catValue, user: this.state.userId}
    task = JSON.stringify(task)
    $.ajax({
      type:'POST',
      url: '/add',
      headers: { 'Content-type' : 'application/json'},
      data: task,
      success: (res => {
        console.log(res)
        this.setState({
          tasks: this.state.tasks.concat(res)
        })
      }),
      dataType: 'JSON',
    })
    this.setState({
      catValue: '',
      value: ''
    });
  }

  deleteTask(event) {
    let element = event.target
    let remove = element.dataset.str;
    let findTask = (obj) => `${obj.task}` === remove
    let index = this.state.tasks.findIndex(findTask)
    let info = {id: this.state.tasks[index].id, user: this.state.userId}
    $.ajax({
      type:'DELETE',
      url: '/',
      headers: {'Content-type' : 'application/json'},
      data: JSON.stringify(info),
      success: (res => {
        this.setState({
          tasks: res
        })
      }),
      dataType: 'JSON',
    })
  }

  focusOn(text) {
    this.setState({
      focusedValue: text
    })
  }

  taskEdit(data) {
    let findTask = (obj) => `${obj.task}` === this.state.focusedValue;
    let index = this.state.tasks.findIndex(findTask)
    let updateTask = { id: this.state.tasks[index].id, task: data, user: this.state.userId}
    $.ajax({
      type:'PUT',
      url: '/task',
      headers: {'Content-type' : 'application/json'},
      data: JSON.stringify(updateTask),
      success: (res => {
        this.setState({
          tasks: res
        })
      }),
      dataType: 'JSON',
    })
  }

  catEdit(data) {
    let info = Object.entries(data)
    let task = info[0][0];
    let newCat = info[0][1];
    let findTask = (obj) => `${obj.task}` === task;
    let index = this.state.tasks.findIndex(findTask)
    let updateTask = { id: this.state.tasks[index].id, cat: newCat, user: this.state.userId }
    $.ajax({
      type:'PUT',
      url: '/cat',
      headers: {'Content-type' : 'application/json'},
      data: JSON.stringify(updateTask),
      success: (res => {
        this.setState({
          tasks: res
        })
      }),
      dataType: 'JSON',
    })
  }

  toggleComp(event) {
    let element = event.target
    let task = element.dataset.comp;
    let findTask = (obj) => `${obj.task}` === task;
    let index = this.state.tasks.findIndex(findTask);
    let currCompStatus = this.state.tasks[index].completed;
    let data =  currCompStatus === 1 ? 0 : 1
    let updateCompleted = { id: this.state.tasks[index].id, comp: data, user: this.state.userId }
    $.ajax({
      type:'PUT',
      url: '/completed',
      headers: {'Content-type' : 'application/json'},
      data: JSON.stringify(updateCompleted),
      success: (res => {
        this.setState({
          tasks: res
        })
      }),
      dataType: 'JSON',
    })
  }

  getFinished(e) {
    let user = {id: this.state.userId}
  $.ajax({
    type: 'Post',
    url: '/finished',
    headers: {'Content-type' : 'application/json'},
    data: JSON.stringify(user),
    success: (res => {
      this.setState({
        tasks: res
      })
    }),
    dataType: 'JSON'
  })
  }

  getUnfinished(e) {
    let user = {id: this.state.userId}
  $.ajax({
    type: 'Post',
    url: '/unfinished',
    headers: {'Content-type' : 'application/json'},
    data: JSON.stringify(user),
    success: (res => {
      this.setState({
        tasks: res
      })
    }),
    dataType: 'JSON'
  })
  }

  render () {
    if (this.state.userId === 0) {
      return (
        <form id="tasks_form">
          <label>
            Please Enter Your User Name:
            <input type="text" onChange={this.addUser}/>
          </label>
          <input type="submit" value="submit" onClick={this.getUser}/>
        </form>
      )
    }
    return (<div>
      <h1>DATA Task Organizer</h1>
    <p>Welcome back <i><b>{this.state.user}</b></i></p>
      <form id="main_form">
        <label>
          Add Task:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Add Catagory:
          <input type="text" value={this.state.catValue} onChange={this.handleChangeCat} />
        </label>
        <input type="submit" value="ADD" onClick={this.handleSubmit}/>
      </form>
      <List items={this.state.tasks} remove={this.deleteTask} taskEdit={this.taskEdit} focusOn={this.focusOn} catEdit={this.catEdit} toggleComp={this.toggleComp} />
      <ul>Sort by:
        <li onClick={this.getUser}>All</li>
        <li onClick={this.getFinished}>Finished</li>
        <li onClick={this.getUnfinished}>Unfinished</li>
      </ul>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));