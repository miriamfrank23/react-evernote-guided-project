import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/

class Content extends Component {
  renderContent = () => {
    if (this.props.noteToEdit) {
      return <NoteEditor noteToEdit={this.props.noteToEdit}
      addEditedNote={this.props.addEditedNote}removeEditedNote={this.props.removeEditedNote}/>;
    } else if (this.props.currentNote) {
      return <NoteViewer currentNote={this.props.currentNote}
      selectNoteToEdit={this.props.selectNoteToEdit}/>;
    } else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
