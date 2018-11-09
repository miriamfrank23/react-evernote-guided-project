import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      currentNote: null,
      editNote: false,
      searchInput: ""
    };
  }

  componentDidMount() {
    this.fetchNotes();
  }

  captureInput = input => {
    this.setState(
      {
        searchInput: input
      },
      () => {
        console.log(this.state.searchInput);
      }
    );
  };

  selectCurrentNote = noteId => {
    this.setState(
      {
        currentNote: noteId
      },
      () => {
        console.log(this.state.currentNote);
      }
    );
  };

  // addEditedNote = note => {
  //   const newNote = note;
  //   const newNotes = this.state.notes.map(eachNote => {
  //     if (eachNote.id === newNote.id) {
  //       return (eachNote = newNote);
  //     } else {
  //       return (eachNote = eachNote);
  //     }
  //   });
  //   this.setState({
  //     notes: newNotes
  //   });
  // };

  addNewNote = note => {
    const allNotes = this.state.notes.concat(note);
    this.setState({
      notes: allNotes
    });
  };

  // removeEditedNote = () => {
  //   this.setState({
  //     noteToEdit: ""
  //   });
  // };

  // selectNoteToEdit = note => {
  //   this.setState(
  //     {
  //       noteToEdit: note
  //     },
  //     () => {
  //       console.log(this.state.noteToEdit);
  //     }
  //   );
  // };

  fetchNotes = () => {
    fetch("http://localhost:3000/api/v1/notes")
      .then(resp => resp.json())
      .then(json => {
        this.setState(
          {
            notes: json
          },
          () => {
            console.log(this.state);
          }
        );
      });
  };

  currentNote() {
    return this.state.notes.find(
      noteObj => noteObj.id === this.state.currentNote
    );
  }

  handleEditRequest = () => {
    this.setState(currentState => ({ editNote: !currentState.editNote }));
  };

  render() {
    return (
      <Fragment>
        <Search captureInput={this.captureInput} />
        <div className="container">
          <Sidebar
            notes={this.state.notes}
            selectCurrentNote={this.selectCurrentNote}
            removeEditedNote={this.removeEditedNote}
            searchInput={this.state.searchInput}
            addNewNote={this.addNewNote}
          />

          <Content
            // removeEditedNote={this.removeEditedNote}
            currentNote={this.currentNote()}
            handleEditRequest={this.handleEditRequest}
            editNote={this.state.editNote}
            // selectNoteToEdit={this.selectNoteToEdit}
            // noteToEdit={this.state.noteToEdit}
            // addEditedNote={this.addEditedNote}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
