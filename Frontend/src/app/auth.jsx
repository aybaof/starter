import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie"
import { AuthApi } from "../module/Api/auth";
import { HttpInstance } from "../module/HttpClient";


const authContext = createContext();



export function AuthProvider({ children }) {

  const [authed, setAuthed] = useState(false);
  const [id_user, setId_user] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const [jwt, setJwt] = useState(window.localStorage.getItem("Authorization") || "")

  const [cookies, setCookie, removeCookie] = useCookies("jwt");

  useEffect(() => {
    HttpInstance.setBearerAuth(jwt);
  }, [jwt])

  const isConnected = async () => {
    return await AuthApi.init().then(res => {
      if (res.success === true) {
        setAuthed(true);
        setId_user(res.id_user)
        setIsAdmin(res.admin_user)
        setJwt(window.localStorage.getItem("Authorization"));
        return true
      }
      return false
    });
  }


  const login = async (user) => {
    const res = await AuthApi.login(user);
    if (!res.success) return res
    setAuthed(true)
    setId_user(res.id_user)
    setIsAdmin(res.admin_user)
    setJwt(res.token)
    return res
  };

  const signUp = async (user = {}) => {
    const res = await AuthApi.create(user);
    if (!res.success) return res
    setAuthed(true);
    setJwt(res.token)
    setId_user(res.id_user)
    return res
  }

  const signOut = () => {
    return new Promise(async (res) => {
      setAuthed(false);
      setId_user(null);
      setIsAdmin(false)
      window.localStorage.clear("Authorization")
      removeCookie("jwt", { path: "/" })
    });
  };

  const value = {
    login: login,
    signOut: signOut,
    signUp: signUp,
    isConnected: isConnected,
    authed: authed,
    jwt: jwt,
    isAdmin: isAdmin,
    id_user: id_user
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}


