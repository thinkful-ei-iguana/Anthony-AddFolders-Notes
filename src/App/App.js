import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";
import UserContext from "../Context/Context";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  getApiFolders() {
    return fetch("http://localhost:9090/folders")
      .then(res => res.json())
      .then(folders => this.setState({ folders: folders }))
      .catch(e => {
        console.log(e.message);
      });
  }

  getApiNotes = () => {
    fetch("http://localhost:9090/notes")
      .then(res => res.json())
      .then(notes => this.setState({ notes: notes }))
      .catch(e => {
        console.log(e.message);
      });
  };

  deleteNote = noteId => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.getApiNotes();
        console.log('Delete Note API ran');       
      })
      .catch(err => console.log(err.message));
  };

  componentDidMount() {
    // fake date loading from API call
    this.getApiFolders();
    this.getApiNotes();
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <UserContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes
        }}
      >
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => <NoteListNav {...routeProps} />}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </UserContext.Provider>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <UserContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          deleteNote: this.deleteNote
        }}
      >
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            return <NotePageMain {...routeProps} />;
          }}
        />
      </UserContext.Provider>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
