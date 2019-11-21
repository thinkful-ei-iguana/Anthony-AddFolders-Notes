import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";
import Context from "../Context/Context";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static contextType = Context;
  render() {
    const deleteNote = this.props.action || this.context.deleteNote;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={() => deleteNote(this.props.id)}
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{" "}
            <span className="Date">
              {format(this.props.modified, "Do MMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  modified: PropTypes.string,
  onDeleteNote: PropTypes.func
};
