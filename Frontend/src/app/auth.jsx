import * as React from "react";
import { Navigate } from "react-router-dom";

const authContext = React.createContext();

// function useAuth() {
//   return {
//     authed,
//     login() {
//       return new Promise((res) => {
//         setAuthed(true);
//         res();
//       });
//     },
//     logout() {
//       return new Promise((res) => {
//         setAuthed(false);
//         res();
//       });
//     },
//   };
// }

export function AuthProvider({ children }) {
  const [authed, setAuthed] = React.useState(false);

  const login = () => {
    return new Promise((res) => {
      setAuthed(true);
      res();
    });
  };

  const signOut = () => {
    return new Promise((res) => {
      setAuthed(false);
      res();
    });
  };

  const value = {
    login: login,
    signOut: signOut,
    authed: authed,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}


