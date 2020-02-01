import React from 'react';
import EditableLabel from 'react-inline-editing';
import InlineEdit from 'react-edit-inline';

const ListItem = (props) => (
  <tr>
    <td id="task_cell" data-str={props.item.task} onClick={props.remove}>X</td>
    <td>
      <EditableLabel
        text={props.item.task}
        onFocus={props.focusOn}
        onFocusOut={props.taskEdit}
      />
    </td>
    <td id="task_cell">
      <InlineEdit
        text={props.item.cat}
        paramName={props.item.task}
        change={props.catEdit}
      />
    </td>
    <td id="task_cell" data-comp={props.item.task} onClick={props.toggleComp}>
      {props.item.completed === 1 ? 'Yes' : 'Not Yet' }
      </td>
  </tr>
)

export default ListItem;