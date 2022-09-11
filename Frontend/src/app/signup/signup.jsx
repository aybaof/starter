import "./signup.scss";
import React from "react";

import { useNavigate } from "react-router-dom";
import icon from "../../assets/logo/icon-left-font-monochrome-black.png";

const SignUp = () => {
  const navigate = useNavigate();
  const makeForm = async () => {
    return await new Promise(resolve => {
        let object = {};
        document.querySelectorAll("input").forEach(item => {
            object[item.name] = item.value
        })
        resolve(object)  
    })
  }
  const handleSignUp = async (e) => {
      const form = await makeForm();
  };
  return (
    <div className="full_wrapper">
      <div className="card">
        <div className="img_wrapper">
          <img src={icon} alt="logo groupomania"></img>
        </div>
        <div className="form_wrapper">
          <h2>Inscription</h2>
          <div className="form-group">
            <label htmlFor="email_user">Email</label>
            <input type="text" name="email_user"></input>
          </div>
          <div className="form-group">
            <label htmlFor="password_user">Mot de passe</label>
            <input type="password" name="password_user"></input>
          </div>
          <div className="action">
            <button className="btn-primary" onClick={handleSignUp}>Inscription</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
