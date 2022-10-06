import * as React from "react";
import { Navigate } from "react-router-dom";
import { AuthClient } from "../module/Api/auth";

const authContext = React.createContext();

const AuthApi = new AuthClient("http://localhost:5000/api/");
AuthApi.setHeader("Content-Type" , "application/json")
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

  const signUp = async (user = {}) => {
    console.log(AuthApi._baseURL)
    const res = await AuthApi.Auth.create(user);
    if(res.success) setAuthed(true);
    return true
  }

  const signOut = () => {
    return new Promise((res) => {
      setAuthed(false);
      res();
    });
  };

  const value = {
    login: login,
    signOut: signOut,
    signUp : signUp,
    authed: authed
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}


