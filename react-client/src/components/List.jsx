import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.items.length } items on your todo list.
    <ul>
    { props.items.map(item => <ListItem item={item}/>)}
    </ul>
  </div>
)

export default List;