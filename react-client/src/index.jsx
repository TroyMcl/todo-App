import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Mr. Test',
      tasks: [],
      value: '',
      focusedValue: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.taskEdit = this.taskEdit.bind(this);
    this.focusOn = this.focusOn.bind(this);
    this.catEdit = this.catEdit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    //run POST add new event to db & update state
    let task = {value: this.state.value}
    task = JSON.stringify(task)
    console.log(task)
    $.ajax({
      type:'POST',
      url: '/',
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
  }

  deleteTask(event) {
    let element = event.target
    console.log(element.dataset.str)
    let remove = element.dataset.str;
    let findTask = (obj) => `${obj.task}` === remove
    let index = this.state.tasks.findIndex(findTask)
    $.ajax({
      type:'DELETE',
      url: '/',
      headers: {'Content-type' : 'application/json'},
      data: JSON.stringify(this.state.tasks[index]),
      success: (res => {
        this.setState({
          tasks: res
        })
      }),
      dataType: 'JSON',
    })
  }

  focusOn(text) {
    console.log('text before editing', text)
    this.setState({
      focusedValue: text
    })
  }

  taskEdit(data) {
    let findTask = (obj) => `${obj.task}` === this.state.focusedValue;
    let index = this.state.tasks.findIndex(findTask)
    let updateTask = { id: this.state.tasks[index].id, task: data }
    console.log(updateTask)
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
    let newCat = info[0][1]
    let findTask = (obj) => `${obj.task}` === task;
    let index = this.state.tasks.findIndex(findTask)
    let updateTask = { id: this.state.tasks[index].id, cat: newCat }
    console.log(updateTask)
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

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        console.log(data)
        this.setState({
          tasks: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>DATA Task Organizer</h1>
    <p>Welcome back <i><b>{this.state.user}</b></i></p>
      <form>
      <label>
        Add Task:
        <input type="text" onChange={this.handleChange} />
      </label>
      <input type="submit" value="ADD" onClick={this.handleSubmit}/>
      </form>
      <List items={this.state.tasks} remove={this.deleteTask} taskEdit={this.taskEdit} focusOn={this.focusOn} catEdit={this.catEdit} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));