import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";
import PropTypes from "prop-types";

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  };
  render() {
    return (
      <div className="NotePageNav">
        <CircleButton
          tag="button"
          role="link"
          onClick={() => this.props.history.goBack()}
          className="NotePageNav__back-button"
        >
          <FontAwesomeIcon icon="chevron-left" />
          <br />
          Back
        </CircleButton>
        {this.props.folder && (
          <h3 className="NotePageNav__folder-name">{this.props.folder.name}</h3>
        )}
      </div>
    );
  }
}

NotePageNav.propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func }),
  match: PropTypes.shape({ params: PropTypes.object })
};
