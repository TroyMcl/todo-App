import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Your Todo List: </h4>
    There are { props.items.length } items on your todo list.
    <table id='tasks_table'>
      <tr id="table_head">
        <td onClick={props.organizeByHeader}></td>
        <td onClick={props.organizeByHeader}>Task</td>
        <td id="task_cell" onClick={props.organizeByHeader}>Catagory</td>
        <td id="task_cell" onClick={props.organizeByHeader}>Completed</td>
      </tr>
      {props.items.map(item => <ListItem item={item} remove={props.remove} taskEdit={props.taskEdit} focusOn={props.focusOn} catEdit={props.catEdit} toggleComp={props.toggleComp}/>)}
    </table>
  </div>
)

export default List;