import "./login.scss";
import React,{ useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../auth.jsx";

import icon from "../../assets/logo/icon-left-font-monochrome-black.png";

import { toast } from "react-toastify";

const Login = () => {

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$.!%*?&]{7,}$/
  const regexEmail = /^\S+@\S+\.\S+$/;

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

  }, [email, password])

  const handleLogin = async () => {
    const user = {
      email_user: email,
      password_user: password
    }

    const res = await login(user);
    if (!res.success) return toast.warn("Impossible de se connecter")
    navigate("/");
  };

  const goToSignUp = () => {
    navigate("/signup")
  }

  return (
    <div className="full_wrapper">
      <div className="card">
        <div className="img_wrapper">
          <img src={icon} alt="logo groupomania"></img>
        </div>
        <div className="form_wrapper h-75 w-80 pb-3">
          <h2 className="fs-bold-4 text-center">Connexion</h2>
          <div className="form-group">
            <label htmlFor="email_user">Email</label>
            <input className={
              regexEmail.test(email) || email === "" ? "" : "invalid"
            }
              type="text"
              name="email_user"
              onChange={({ currentTarget }) => setEmail(currentTarget.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password_user">Mot de passe</label>
            <input className={
              regexPassword.test(password) || password === "" ? "" : "invalid"
            }
              type="password" name="password_user" onChange={({ currentTarget }) => setPassword(currentTarget.value)}></input>
          </div>
          <div className="action">
            <button className="btn-primary w-100" onClick={handleLogin}>
              Connexion
            </button>
            <p className="mb-1 text-start w-100">Pas encore de compte ?</p>
            <button className="btn-tertiary w-100" onClick={goToSignUp}>Inscription</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
