import React from "react";
import Context from "../Context/Context";

export default class AddFolder extends React.Component {
  static contextType = Context;

  ApiCreateFolder = e => {
    const folderName = {
      name: e.target["nameInput"].value
    };

    fetch("http://localhost:9090/folders", {
      method: "POST",
      body: JSON.stringify(folderName),
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
        console.log(folderName);
        this.context.addFolder(resJson);
      });
  };

  submitCreate = e => {
    e.preventDefault();
    Promise.all([this.ApiCreateFolder(e)]).then(this.props.history.push(`/`));
  };

  render() {
    return (
      <form id="js-form" onSubmit={e => this.submitCreate(e)}>
        <input
          id="nameInput"
          type="text"
          required
          placeholder="Enter Folder Name"
        />
        <button id="submitBtn" type="submit">
          create
        </button>
      </form>
    );
  }
}
