import React from "react";
import PropTypes from "prop-types";

export default class Boundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return <h2>Okay I don't know what happened either. Please refresh</h2>;
    }
    return this.props.children;
  }
}

Boundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};
