import React from "react";
import Note from "../Note/Note";
import "./NotePageMain.css";
import Context from "../Context/Context";
import { findNote } from "../notes-helpers";

export default class NotePageMain extends React.Component {
  static contextType = Context;
  render() {
    const noteId = this.props.match.params.noteId;
    const { notes } = this.context;
    const note = findNote(notes, noteId);
    console.log(note);
    return (
      <section className="NotePageMain">
        <Note id={note.id} name={note.name} modified={note.modified} />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}
