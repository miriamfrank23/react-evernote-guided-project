import React, { Fragment } from 'react';

const NoteViewer = (props) => {

  return (
    <Fragment>
      <h2>{props.currentNote.title}</h2>
      <p>{props.currentNote.body}</p>
      <button onClick={() => {props.selectNoteToEdit(props.currentNote)}}>Edit</button>
    </Fragment>
  );
}

export default NoteViewer;
