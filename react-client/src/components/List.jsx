import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Your Todo List: </h4>
    There are { props.items.length } items on your todo list.
    <tbody id='tasks_table'>
      <tr>
        <td></td>
        <td>Task</td>
        <td>Catagory</td>
        <td>Completed</td>
      </tr>
      {props.items.map(item => <ListItem item={item} remove={props.remove}/>)}
    </tbody>
  </div>
)

export default List;