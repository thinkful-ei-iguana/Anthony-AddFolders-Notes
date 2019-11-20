import React, {Component} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import "./NoteListMain.css";
import {getNotesForFolder} from '../notes-helpers';
import Context from '../Context/Context';

export default class NoteListMain extends Component {
  static contextType = Context;

  render() {
    const folderId = this.props.match.params.folderId;
    const {notes, folders} = this.context;
    const folderNotes = getNotesForFolder(notes, folderId);
    console.log(Context)
    

    return (
      <section className="NoteListMain">
        <ul>
          {folderNotes.map(note => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
          ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}

NoteListMain.defaultProps = {
  notes: []
};
