import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {

  const mapThroughProps = () => {
    return filterThroughProps().map(note => {
      return <NoteItem note={note} key={note.id} selectCurrentNote={props.selectCurrentNote}
      removeEditedNote={props.removeEditedNote}/>
    })
  }

  const filterThroughProps = () => {
    return props.notes.filter(note => {
      if (note.title.toLowerCase().includes(props.searchInput.toLowerCase()) | note.body.toLowerCase().includes(props.searchInput.toLowerCase())) {
        return note
      }
    })
  }


  return (
    <ul>
      {mapThroughProps()}
    </ul>
  );
}

export default NoteList;
