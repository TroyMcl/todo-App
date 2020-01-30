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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
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
    console.log(event.target.textContent)
    let remove = event.target.textContent;
    let findTask = (obj) => `${obj.task} ${obj.cat}` === remove
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

    console.log(index)
    //get value of task - send it to server to remove from db
    //set state to that new array
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
      <List items={this.state.tasks} remove={this.deleteTask}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));