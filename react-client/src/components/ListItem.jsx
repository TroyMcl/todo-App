import React from 'react';

const ListItem = (props) => (
  <li onClick={props.remove}>
    {props.item.task } {props.item.cat}
  </li>
)

export default ListItem;