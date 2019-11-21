import React from "react";

const UserContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {}
});

export default UserContext;
