import React ,{createContext , useContext , useState , useEffect} from "react";
import { AuthApi } from "../module/Api/auth";
import { HttpInstance } from "../module/HttpClient";


const authContext = createContext();


export function AuthProvider({ children }) {

  const [authed, setAuthed] = useState(false);
  const [jwt , setJwt] = useState(window.localStorage.getItem("Authorization") || "")

  useEffect (() => {
      AuthApi.init().then(res => {
        console.log(isAuth)
        return false
      });
  },[])


  useEffect( () => {
    HttpInstance.setBearerAuth(jwt);
  } , [jwt])


  const login = async (user) => {
    const res = await AuthApi.login(user);
    if(!res.success) return res 
    setAuthed(true)
    setJwt(res.token)
    return res
  };

  const signUp = async (user = {}) => {
    const res = await AuthApi.create(user);
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
  return useContext(authContext);
}


