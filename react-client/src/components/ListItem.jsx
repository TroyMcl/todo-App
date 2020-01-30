import React from 'react';

const ListItem = (props) => (
  <tr>
    <td data-str={props.item.task} onClick={props.remove}>X</td>
    <td>{props.item.task}</td>
    <td>{props.item.cat}</td>
    <td>{props.item.completed === 1 ? 'Yes' : 'Not Yet' }</td>
  </tr>
)

export default ListItem;