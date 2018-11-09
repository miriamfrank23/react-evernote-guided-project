import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {

  constructor() {
    super()
    this.state = {
      sorted: false,
      sortedByDate: false,
    }
  }

  changeSort = () => {
    this.setState({
      sorted: !this.state.sorted
    }, () => {
      console.log(this.state.sorted);
    })
  }

  changeSortByDate = () => {
    this.setState({
      sortedByDate: !this.state.sortedByDate
    }, () => {
      console.log(this.state.sortedByDate);
    })
  }

  sortByTitle = (notes) => {
    if (!this.state.sorted) {
      return notes.sort((a,b) => a.title.localeCompare(b.title))
    } else {
      return notes.sort((a,b) => a.id - b.id)
    }
  }

  sortByDate = (notes) => {
    if (!this.state.sortedByDate) {
      return notes.reverse()
    } else {
      return notes.sort((a,b) => a.id - b.id)
    }
  }



  makeNewNote = () => {
    fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: 'default',
        body: 'placeholder'
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      this.props.addNewNote(json)
    })
  }

  handleSortChange = () => {
    this.changeSort()
    this.sortByTitle(this.props.notes)
  }

  handleSortByDateChange = () => {
    this.changeSortByDate()
    this.sortByDate(this.props.notes)
  }

  render() {
    return (
      <div className='master-detail-element sidebar'>

      {
        !this.state.sortedByDate ?
         <div><label>Sort notes A-Z</label>
        <input type='checkbox' onChange={() => {this.handleSortChange()}}
        /></div> : null
      }


      {
        !this.state.sorted ? <div>
          <label>Sort notes by most recent</label>
          <input type='checkbox' onChange={() => {this.handleSortByDateChange()}}
          />
        </div> : null
      }


        <NoteList notes={this.props.notes}
        selectCurrentNote={this.props.selectCurrentNote}
        removeEditedNote={this.props.removeEditedNote}
        searchInput={this.props.searchInput}/>

        <button onClick={this.makeNewNote}>New</button>
      </div>
    );
  }
}

export default Sidebar;
