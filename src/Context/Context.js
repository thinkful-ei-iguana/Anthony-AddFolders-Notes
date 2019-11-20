import React from "react";

const UserContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {}
});

export default UserContext;
