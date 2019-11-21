import React, { Component } from "react";
import Context from "../Context/Context";
import "./AddNote.css";

export default class AddNote extends Component {
  static contextType = Context;

  ApiCreateNote = note => {
    fetch(`http://localhost:9090/notes`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(e => Promise.reject(e));
        }
      })
      .then(resJson => {
        console.log(note);
        this.context.addNote(resJson);
      })
      .catch(console.error);
  };

  createNewNote = e => {
    e.preventDefault();
    const note = {
      name: e.target["noteName"].value,
      modified: new Date(),
      folderId: e.target["noteFolderId"].value,
      content: e.target["noteContent"].value
    };
    Promise.all([this.ApiCreateNote(note)]).then(this.props.history.push(`/`));
  };

  render() {
    const { folders } = this.context;

    return (
      <form onSubmit={this.createNewNote}>
        <input
          required
          type="text"
          id="noteName"
          placeholder="Enter note's name"
        />
        <textarea
          required
          type="text"
          id="noteContent"
          placeholder="Enter note's content"
        />

        <label htmlFor="noteFolderId">
          Select which folder you would like the note to be stored in
        </label>
        <select required id="noteFolderId" name="noteFolderId">
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <button type="submit">Create new note</button>
      </form>
    );
  }
}
