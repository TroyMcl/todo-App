import React from 'react';
import EditableLabel from 'react-inline-editing';
import InlineEdit from 'react-edit-inline';

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
    <td>
      <InlineEdit
        text={props.item.cat}
        paramName={props.item.task}
        change={props.catEdit}
      />
    </td>
    <td>{props.item.completed === 1 ? 'Yes' : 'Not Yet' }</td>
  </tr>
)

export default ListItem;