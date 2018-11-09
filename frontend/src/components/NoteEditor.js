import React, { Component } from 'react';

class NoteEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.noteToEdit.title,
      body: this.props.noteToEdit.body
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log(this.state);
    })
  }

  patchChanges = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/notes/${this.props.noteToEdit.id}`,  {
      method: 'PATCH',
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      this.props.addEditedNote(json)
    })
    }


  render() {

    return (
      <form className="note-editor">
        <input type="text" name="title" value={this.state.title}
        onChange={this.handleChange}/>
        <textarea name="body" value={this.state.body}
        onChange={this.handleChange}/>
        <div className="button-row" onClick={this.patchChanges}>
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={this.props.removeEditedNote}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
