import * as React from "react";
import { AuthClient } from "../module/Api/auth";
import { HttpInstance } from "../module/HttpClient";


const authContext = React.createContext();

const AuthApi = new AuthClient(HttpInstance._baseURL , HttpInstance._headers);


export function AuthProvider({ children }) {
  const [authed, setAuthed] = React.useState();
  const [jwt , setJwt] = React.useState(window.localStorage.getItem("Authorization") || "")

  React.useEffect( () => {
    HttpInstance.setBearerAuth(jwt);
  } , [jwt])


  const login = async (user) => {
    const res = await AuthApi.Auth.login(user);
    if(!res.success) return res 
    setAuthed(true)
    setJwt(res.token)
    return res
  };

  const signUp = async (user = {}) => {
    const res = await AuthApi.Auth.create(user);
    if(!res.success) return res
    setAuthed(true);
    setJwt(res.token)
    return res
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
    authed: authed,
    jwt : jwt
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}


