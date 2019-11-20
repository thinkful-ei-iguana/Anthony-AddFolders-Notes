import React from "react";
import Note from "../Note/Note";
import "./NotePageMain.css";
import Context from "../Context/Context";
import { findNote } from "../notes-helpers";

export default class NotePageMain extends React.Component {
  static contextType = Context;

  render() {
    const noteId = this.props.match.params.noteId;
    const { notes, deleteNote } = this.context;
    const note = findNote(notes, noteId);

    const noteDeletePage = noteId => {
      Promise.all([
        deleteNote(noteId)
      ]).then(() => {
        console.log('.then ran')
        this.props.history.push(`/`);
      });
    };

    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          action={noteDeletePage}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}
