import React from 'react';
import EditableLabel from 'react-inline-editing';

const ListItem = (props) => (
  <tr>
    <td data-str={props.item.task} onClick={props.remove}>X</td>
    <td>
      <EditableLabel
        text={props.item.task}
        onFocus={props.focusOn}
        onFocusOut={props.taskEdit}
      />
    </td>
    <td data-tsk={props.item.task} onClick={props.getId}>
      <EditableLabel
        text={props.item.cat}
        onFocus={props.focusOn}
        onFocusOut={props.catEdit}
      />
    </td>
    <td>{props.item.completed === 1 ? 'Yes' : 'Not Yet' }</td>
  </tr>
)

export default ListItem;