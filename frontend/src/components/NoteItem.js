import React from "react";

const NoteList = props => (
  <div
    onClick={() => {
      props.selectCurrentNote(props.note.id);
    }}
  >
    <li>
      <h2>{props.note.title}</h2>
      <p>{`${props.note.body.substring(0, 20)}...`}</p>
    </li>
  </div>
);

export default NoteList;
