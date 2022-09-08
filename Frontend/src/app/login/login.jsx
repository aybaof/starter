import "./login.scss";
import React from "react";

import { useNavigate } from "react-router-dom";
import  useAuth  from "../auth.jsx";

import icon from "../../assets/logo/icon-left-font-monochrome-black.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    await login();
    navigate("/");
  };

  return (
    <div className="full_wrapper">
      <div className="card">
        <div className="img_wrapper">
          <img src={icon} alt="logo groupomania"></img>
        </div>
        <div className="form_wrapper">
          <h2>Connexion</h2>
          <div className="form-group">
            <label htmlFor="email_user">Email</label>
            <input type="text" name="email_user"></input>
          </div>
          <div className="form-group">
            <label htmlFor="password_user">Mot de passe</label>
            <input type="password" name="password_user"></input>
          </div>
          <div className="action">
            <button className="btn-primary" onClick={handleLogin}>
              Connexion
            </button>
            <p>Pas encore de compte ?</p>
            <button className="btn-tertiary">Inscription</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
